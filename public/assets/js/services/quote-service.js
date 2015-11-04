app.factory('quoteService', 
    ['localStorageService', '$rootScope', '$http', 
    function (localStorageService, $rootScope, $http) {
    var obj = {
        'item': [],
        'weight': [],
        'total_weight': 0,
        'country': 'Peninsular Malaysia',
        'price_per_unit': 0,
        'selected_courier': {},
        'shipping_cost': 0,
        'total_price': 0 // total price of the quote (including the shipping cost)
    };
        
    obj.countries = [
      { name: 'Malaysia', code: 'MYS' },
      { name: 'Brunei', code: 'BRN' },
      { name: 'Vietnam', code: 'VNM' }
    ]
    $http.get($rootScope.url + 'logistic/countries')
    .success(function(data){
        obj.countries = data;
    })
    
        
    if(localStorageService.get('quote'))
    {
        obj.item = localStorageService.get('quote');
        console.log(obj.item);
    }
    
    obj.add = function(item){
        
        // Check if item already exists
        var exists = false;
        var exists_index;
        for(var i in obj.item)
        {
            if(obj.item[i].article_id == item.article_id)
            {
                exists = true;
                exists_index = i;
            }
        }
        
        if(exists == true)
        {
            obj.item[i].quantity += 1;
        }
        else
        {
            item.quantity = 1;
            obj.item.push(item);
        }
        // Calculate shipping
        obj.calculateShipping();
        obj.saveItem();
    }
    
    obj.remove = function(index){
        if(obj.item[index].quantity > 1)
        {
            obj.item[index].quantity -= 1;
        }
        else
        {
            obj.item.splice(index, 1);
        }
        obj.calculateShipping();
        obj.saveItem();
    }
    
    obj.calculateShipping = function(){
        obj.weight = [];
        obj.total_weight = 0;
        obj.selected_courier = {};
        obj.shipping_cost = 0;
        var weight = 0;
        for(var i in obj.item)
        {
            var package_weight = 0;
            for(var j in obj.item[i].packages)
            {
                if(obj.item[i].packages[j].width != "" &&
                   obj.item[i].packages[j].height != "" &&
                   obj.item[i].packages[j].length != "")
                {
                    weight = obj.item[i].packages[j].width
                             * obj.item[i].packages[j].height
                             * obj.item[i].packages[j].length;
                    if(parseFloat(weight) < parseFloat(obj.item[i].packages[j].weight))
                    {
                       weight = obj.item[i].packages[j].weight;
                    }
                }
                else
                {
                    weight = obj.item[i].packages[j].weight;
                }
                
                if(package_weight)
                {
                    package_weight = package_weight + parseFloat(weight);
                }
                else
                {
                    package_weight = weight;
                }
            }
            if(obj.item[i].quantity)
            {
                package_weight = package_weight * obj.item[i].quantity;
            }
            obj.weight.push(package_weight);
        }
        
        for(var i in obj.weight)
        {
            obj.total_weight = obj.total_weight + parseFloat(obj.weight[i]);
        }
        
        // Get the shipping details
        var couriers = [];
        $http.get($rootScope.url + 'logistic')
        .success(function(data){
            for(var i in data)
            {
              data[i].conditions = JSON.parse(data[i].conditions);
            }
            couriers = data;
            
            obj.shipping_cost = 0;
            // Check which condition is right
            for(var i in couriers)
            {
                for(var j in couriers[i].conditions)
                {
                    if(couriers[i].conditions[j].location == obj.country)
                    {
                        if(eval(obj.total_weight + ' ' + 
                                couriers[i].conditions[j].compare + ' ' + 
                                couriers[i].conditions[j].weight))
                        {
                            var x = obj.total_weight;
                            var v = 0;
                            
                            for(var k in couriers[i].conditions[i].prices)
                            {
                                eval(couriers[i].conditions[i].prices[k].formula)
                                obj.shipping_cost += v; 
                            }
                            
                            obj.price_per_unit = couriers[i].price_per_unit;
                            obj.selected_courier = couriers[i];
                            break;
                        }
                    }
                }
            }
            
            obj.calculateTotal();

        })
    }
    obj.calculateTotal = function(){
        obj.total_price = 0;
        for(var i in obj.item)
        {
            var additional_price = {};
            if(obj.item[i].assembly_detail)
            {
                console.log('assembly_detail');
                if(obj.item[i].assembly_detail.price.match(/%/) != null)
                {
                    // Get the value
                    additional_price = {
                        operator: '*',
                        value: parseInt(obj.item[i].assembly_detail.price.match(/[0-9]*\.?[0-9]+/)[0]) / 100
                    }
                }
                else
                {
                    additional_price = {
                        operator: '+',
                        value: obj.item[i].assembly_detail.price.match(/[0-9]*\.?[0-9]+/)[0]
                    }
                }
            }
            
            if(Object.keys(additional_price).length > 0)
            {
               console.log('additional price');
               if(additional_price.operator == '*')
               {
                   var assembly_price = eval((accounting.unformat(obj.item[i].price) * obj.item[i].quantity) 
                                  + additional_price.operator + additional_price.value);
                   obj.total_price += (accounting.unformat(obj.item[i].price) * obj.item[i].quantity) + assembly_price
               }
               else
               {
                   obj.total_price += eval((accounting.unformat(obj.item[i].price) * obj.item[i].quantity) 
                                      + additional_price.operator + additional_price.value);
               }
            }
            else
            {
                obj.total_price += accounting.unformat(obj.item[i].price) * obj.item[i].quantity;
            }
        }
        obj.total_price += accounting.unformat(obj.shipping_cost);
        
        // Lazee Fee
        obj.lazeefee = accounting.toFixed(obj.total_price * 0.15, 2);
        
        obj.total_price += accounting.unformat(obj.lazeefee);
        
        console.log(obj);
    }
    obj.changeCountry = function(country){
        if(country)
        {
            obj.country = country;
            obj.calculateShipping();
        }
        console.log(obj);
        console.log(country);
    }
    obj.saveAssembly = function(index, assembly){
        obj.item[index].assembly_detail = assembly;
        obj.calculateTotal();
        obj.saveItem();
    }
    obj.clearAssembly = function(index){
        delete obj.item[index].assembly_detail;
        obj.calculateTotal();
        obj.saveItem();
    } 
    obj.saveNote = function(index, note){
        obj.item[index].note = note;
        obj.saveItem();
    }
    obj.clearNote = function(index){
        delete obj.item[index].note;
        obj.saveItem();
    } 
    obj.saveItem = function(){
        localStorageService.set('quote', obj.item);
    } 
    obj.getCountry = function(){
        return obj;
    }
    obj.getItems = function(){
        obj.calculateShipping();
        return obj.item;
    }
    obj.clear = function(){
        delete obj.item;
        obj.item = [];
        obj.saveItem();
    }
    
    return obj;
}]);
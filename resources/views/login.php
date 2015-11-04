<!DOCTYPE html>
<html lang="en" ng-app="jace">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>SkyNature</title>
    <meta name="msapplication-TileColor" content="#9f00a7">
    <meta name="msapplication-TileImage" content="assets/img/favicon/mstile-144x144.png">
    <meta name="msapplication-config" content="assets/img/favicon/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">
    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon-precomposed" sizes="60x60" href="apple-touch-icon-60x60.png" />
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon-precomposed" sizes="76x76" href="apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="apple-touch-icon-152x152.png" />
    <link rel="icon" type="image/png" href="favicon-196x196.png" sizes="196x196" />
    <link rel="icon" type="image/png" href="favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />
    <link rel="icon" type="image/png" href="favicon-128.png" sizes="128x128" />
    <meta name="application-name" content="&nbsp;"/>
    <meta name="msapplication-TileColor" content="#FFFFFF" />
    <meta name="msapplication-TileImage" content="mstile-144x144.png" />
    <meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
    <meta name="msapplication-square150x150logo" content="mstile-150x150.png" />
    <meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
    <meta name="msapplication-square310x310logo" content="mstile-310x310.png" />
    <link rel="manifest" href="assets/img/favicon/manifest.json">
    <link rel="shortcut icon" href="assets/img/favicon/favicon.ico">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>  <script src="//oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>  <script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>  <![endif]-->
    <link href="assets/css/vendors.min.css" rel="stylesheet" />
    <link href="assets/css/styles.min.css" rel="stylesheet" />
    <link href="assets/css/custom.css" rel="stylesheet" />
    <script charset="utf-8" src="//maps.google.com/maps/api/js?sensor=true"></script>
  </head>
  <body class="page-login" init-ripples="">
    <div class="center">
      <div class="card bordered z-depth-2" style="margin:0% auto; max-width:400px;">
        <div class="card-header">
          <div class="brand-logo">
            <div id="logo">
              
            </div>
            SkyNature 
          </div>
        </div>
        <div class="card-content">
          <?php if(count($errors)){ ?>
          <div class="alert alert-dismissible alert-danger">
            <button type="button" class="close" data-dismiss="alert">×</button>
            Invalid Login!
          </div>
          <?php } ?>
          <div class="m-b-30">
            <div class="card-title strong pink-text">Login</div>
            <p class="card-title-desc"></p>
          </div>
          <form id="loginform" class="form-floating" method="post" action="auth/login">
            <div class="form-group">
              <label for="inputEmail" class="control-label">Email</label>
              <input type="text" class="form-control" name="email" value="<?php echo Request::old('email'); ?>"> 
            </div>
            <div class="form-group">
              <label for="inputPassword" class="control-label">Password</label>
              <input type="password" class="form-control" id="inputPassword" name="password"> 
            </div>
          </form>
        </div>
        <div class="card-action clearfix">
          <div class="pull-right">
            <button type="submit" form="loginform" class="btn btn-link black-text">Login</button>
          </div>
        </div>
      </div>
    </div>
    <script charset="utf-8" src="assets/js/vendors.min.js"></script>
    <script charset="utf-8" src="assets/js/app.min.js"></script>
  </body>
</html>
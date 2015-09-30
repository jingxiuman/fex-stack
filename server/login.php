<?php
/**
 * Created by PhpStorm.
 * User: zhoub
 * Date: 2015/9/27
 * Time: 21:01
 */
$type = $_POST['type'];
$token_solid = "KnowThis";
$data = date('Y-m-d');
if($type == "token"){
    $pass = strip_tags(trim($_POST['username']));
    echo urldecode(json_encode(md5($pass.$token_solid.$data)));
}
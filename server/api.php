<?php
/**
 * Created by PhpStorm.
 * User: zhoub
 * Date: 2015/9/26
 * Time: 19:58
 */

    $token = strip_tags(trim($_POST['token']));
    $username = strip_tags(trim($_POST['username']));
if($token and $username){
    $token_solid = "KnowThis";
    $data = date('Y-m-d');
    $token_result = md5($username.$token_solid.$data);
    if($token_result == $token){
        $arr = array(
            'code' => '200',
            'token' => $token_result
        );
    }else{
       $arr = array(
               'code' => '100',
               'token' =>''
           );
    }
}else{
    $arr = array(
        'code' => '300',
        'token' =>''
    );

}

echo urldecode(json_encode($arr));


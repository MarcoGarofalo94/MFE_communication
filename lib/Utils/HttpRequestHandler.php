<?php

namespace OCA\CorecomDashboard\Utils;

class HttpRequestHandler {

    public static function sendRequest($method, $url, $headers = null, $postparams = null, $username = null, $password = null) {

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_VERBOSE, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        if($headers != null) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }

        if($method == 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postparams);
        } else if($method == 'DELETE') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postparams);
        } else if($method == 'PUT') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postparams);
        }

        if($username != null && $password != null)
            curl_setopt($ch, CURLOPT_USERPWD, $username . ":" . $password);

        $data = curl_exec($ch);

        // Check the return value of curl_exec(), too
       // if ($data === false) {
        //    die(curl_error($ch) . " " . curl_errno($ch));
       // }

        $header_size = curl_getinfo($ch)["header_size"];

        $code = curl_getinfo($ch)["http_code"];
        $header = substr($data, 0, $header_size);
        $body = substr($data, $header_size);

        $res = [
            "code" => $code,
            "header" => $header,
            "body" => $body
        ];

        return $res;

    }

}
<?php

namespace OCA\CorecomDashboard\Utils;


use OCA\CorecomDashboard\Utils\HttpRequestHandler;
use OCA\CorecomDashboard\Service\ServiceException;
use Throwable;

class TeracueApiManager {

    private static function getExceptionMessage($code) {
        switch ($code) {
            case 10:
                $message = "Error getting remux configuration.";
                break;
            case 11:
                $message = "Error getting tuners configuration.";
                break;
            case 12:
                $message = "Error getting tsip configuration.";
                break;
            case 13:
                $message = "Error getting iptv configuration.";
                break;
            default:
                $message = 'TeracueApiManager generic error.';
                break;

        }
        return $message;
    }

    private static function throwException($code) {
        throw new ServiceException(ServiceException::ERROR_CUSTOM, self::getExceptionMessage($code), $code);
    }

    private static function getHostname() {
        return 'http://10.12.10.54';
    }

    private static function getAuthorizationHeader() {
        return 'Authorization: Basic cm9vdDoxMjM0NQ==';
    }

    private static function getHeaders($accept = 'application/json', $content = 'application/json', $conentLength = null) {
        $authorization_header = self::getAuthorizationHeader();

        $headers = array(
            'Content-Type: ' . $content,
            'Accept: ' . $accept,
            $authorization_header
        );

        if($conentLength != null)
            $headers[] = 'Content-Length: ' . $conentLength;

        return $headers;
    }

    private static function handleResponse($response) {

        $res = [
            "code" => 0,
            "message" => "",
            "description" => ""
        ];

        if($response != null && is_array($response)) {
            if(isset($response['code']) && isset($response['header']) && isset($response['body'])) {
                try {
                    $res = JsonHandler::decode($response['body']);
                    if(!isset($res["code"])) {
                        $res = [
                            "code" => intval($response["code"]),
                            "message" => $res
                        ];
                    }
                } catch (\Throwable $e) {
                    $res = [
                        "code" => intval($response["code"]),
                        "message" => $response['body'] //The body isn't in json format
                    ];
                }
            } else {
                $res["code"] = 1;
                $res["message"] = "RESPONSE_ERROR_1";
                $res["description"] = "Invalid response from endpoint. Wrong http response format.";
            }
        } else {
            $res["code"] = 0;
            $res["message"] = "RESPONSE_ERROR_0";
            $res["description"] = "No response from endpoint.";
        }

        if(!isset($res["code"]) || $res["code"] != 200) {
            throw new JsonResponseException($res);
        }

        return $res["message"];
    }

    private static function handleResult($result) {
        return ['success' => true, 'result' => $result];
    }

    private static function extractProgramsArray($data, $key_input, $key_output) {

        if(isset($data[$key_input]["program_number"])) {

            $program_numbers = $data[$key_input]["program_number"];
            $program_names = $data[$key_input]["program_name"];

            if (isset($data[$key_output]["program_number"])) {
                $program_selected = $data[$key_output]["program_number"];
                if (sizeof($program_selected) > 1) {
                    foreach (array_keys($program_selected) as $k) {
                        $program_selected[$k] = $program_selected[$k]["@attributes"]["value"];
                    }
                } else
                    $program_selected = [$program_selected["@attributes"]["value"]];
            } else
                $program_selected = [];  // no selected programs for this source (tuner(n), ASI, IP, IP2)

            $res = [];
            for ($j = 0; $j < sizeof($program_numbers); $j++) {
                $checked = in_array($program_numbers[$j]["@attributes"]["value"], $program_selected);
                $res[] = [
                    "pid" => $program_numbers[$j]["@attributes"]["value"],
                    "pname" => trim($program_names[$j]["@attributes"]["value"]),
                    "pchecked" => $checked
                ];
            }

            return $res;  // list of programs for this source with their information

        }

        return [];  // no programs for this source (tuner(n), ASI, IP, IP2)

    }

    public static function getRemuxConfiguration($onlyPrograms = false) {

        $postStr = "read=submit&Index=0";

        $response =  HttpRequestHandler::sendRequest('POST', self::getHostname() . '/cgi-bin/mux.cgi', self::getHeaders("application/json", "application/x-www-form-urlencoded", strlen($postStr)), $postStr);

        try {
            $xml = self::handleResponse($response);
            $data = JsonHandler::decode(JsonHandler::encode(simplexml_load_string($xml)));
            $res = [];

            if(!$onlyPrograms) {
                foreach (array_keys($data) as $k) {
                    if ($k != "muxIndex" && $k != "out_value_biterate"
                        && $k != "input_count" && $k != "output_count"
                        && stripos($k, "ASI") !== 0 && stripos($k, "IP") !== 0 && stripos($k, "Encoder") !== 0) {
                        if (sizeof($data[$k]) == 1 && isset($data[$k]["@attributes"]))
                            $res[$k] = $data[$k]["@attributes"]["value"];
                    }
                }
            }

            $res["asi"] = self::extractProgramsArray($data, "ASI_input", "ASI_output");
            $res["ip"] = self::extractProgramsArray($data, "IP_input", "IP_output");
            $res["ip2"] = self::extractProgramsArray($data, "IP2_input", "IP2_output");

            for($i = 1; $i < 9; $i++) {
                try {
                    $res["tuner" . $i] = self::extractProgramsArray($data, "Encoder" . $i . "_input",
                        "Encoder" . $i . "_output");
                } catch (Throwable $e) {
                    //Do nothing and keep going (probably array key not found)
                }
            }

            return self::handleResult($res);
        } catch (JsonResponseException $e) {;
            throw $e;
        }

    }

    public static function getRemuxProgramConfiguration(){
        try {
            return self::getRemuxConfiguration(true);
        } catch (JsonResponseException $e) {;
            throw $e;
        }
    }

    public static function setRemuxProgramConfiguration(string $config){

        /*  example:

            $config =
            '{
                "tuner1": [
                    {
                        "pid":"3402",
                        "pname":"Rai 2",
                        "pchecked":true
                    }
                ],
                ...
                "tuner8": [...]
            }'
        */

        try {
            $tmp = self::getRemuxConfiguration();
        } catch (JsonResponseException $e) {
            throw $e;
        }

        if($tmp["success"] == false)
            self::throwException(10);   //Error getting remux configuration

        $currentConfig = $tmp["result"];

        $newConfig = JsonHandler::decode($config);

        foreach (array_keys($newConfig) as $k) {
            $currentConfig[$k] = $newConfig[$k];
        }

        $postStr = "apply=submit&muxIndex=0";

        foreach (array_keys($currentConfig) as $k) {

            if(stripos($k, "tuner") === 0) {
                $vname = str_replace("tuner", "Encoder", $k) . "_output_checkbox";
                foreach ($currentConfig[$k] as $program) {
                    if ($program["pchecked"] == true)
                        $postStr = $postStr . "&" . $vname . "=" . $program["pid"];
                }
            } else if($k == "asi" || $k == "ip" || $k == "ip2") {
                $vname = strtoupper($k) . "_output_checkbox";
                foreach ($currentConfig[$k] as $program) {
                    if ($program["pchecked"] == true)
                        $postStr = $postStr . "&" . $vname . "=" . $program["pid"];
                }
            } else {
                $postStr = $postStr . "&" . $k . "=" . $currentConfig[$k];
            }

        }

        $response =  HttpRequestHandler::sendRequest('POST', self::getHostname() . '/cgi-bin/mux.cgi', self::getHeaders("application/json", "application/x-www-form-urlencoded", strlen($postStr)), $postStr);

        try {
            return self::handleResult(self::handleResponse($response));     // Success response is empty body ( {"success":true,"result":""} ).
        } catch (JsonResponseException $e) {;
            throw $e;
        }

    }

    public static function getTunersConfigurations() {

        $res = [];

        for($i=0; $i < 8; $i++) {

            $postStr = "read=submit&Index=" . $i;

            $response = HttpRequestHandler::sendRequest('POST', self::getHostname() . '/cgi-bin/tuner.cgi', self::getHeaders("application/json", "application/x-www-form-urlencoded", strlen($postStr)), $postStr);

            try {
                $xml = self::handleResponse($response);
                $data = JsonHandler::decode(JsonHandler::encode(simplexml_load_string($xml)));
                $res1 = [];
                foreach (array_keys($data) as $k) {
                    $res1[$k] = $data[$k]["@attributes"]["value"];
                }
            } catch (JsonResponseException $e) {
                throw $e;
            }

            $res["tuner" . ($i + 1)] = $res1;

        }

        return self::handleResult($res);

    }

    public static function setTunersConfigurations($config) {

        try {
            $tmp = self::getTunersConfigurations();
        } catch (JsonResponseException $e) {
            throw $e;
        }

        if($tmp["success"] == false)
            self::throwException(11);   //Error getting tuners configuration

        $res = "";

        $currentConfig = $tmp["result"];

        $newConfig = JsonHandler::decode($config);

        foreach (array_keys($newConfig) as $k) {
            if(isset($currentConfig[$k])) {
                foreach (array_keys($currentConfig[$k]) as $k1) {
                    if(isset($newConfig[$k][$k1]))
                        $currentConfig[$k][$k1] = $newConfig[$k][$k1];
                }
            }
        }

        foreach (array_keys($currentConfig) as $k) {

            $postStr = "apply=submit";

            foreach (array_keys($currentConfig[$k]) as $k1) {
                if($k1 !== "plp_id_count")
                    $postStr = $postStr . "&" . $k1 . "=" . $currentConfig[$k][$k1];
            }

            $response = HttpRequestHandler::sendRequest('POST', self::getHostname() . '/cgi-bin/tuner.cgi', self::getHeaders("application/json", "application/x-www-form-urlencoded", strlen($postStr)), $postStr);

            try {
                $res = $res . self::handleResponse($response);
            } catch (JsonResponseException $e) {
                throw $e;
            }

        }

        return self::handleResult($res);

    }

    public static function getTunersStatus(){

        $response =  HttpRequestHandler::sendRequest('GET', self::getHostname() . '/cgi-bin/tuner_status.cgi?cur_time=' . time(), self::getHeaders(), null);

        try {
            $xml = self::handleResponse($response);
            $data = JsonHandler::decode(JsonHandler::encode(simplexml_load_string($xml)));
            $res = [];
            foreach (array_keys($data) as $k) {
                $parts = explode("_", $k);
                $res[$parts[0]][$parts[1]] = $data[$k]["@attributes"]["value"];
                $tmp = explode(": ", $res[$parts[0]][$parts[1]]);
                $res[$parts[0]][$parts[1]] = $tmp[sizeof($tmp) - 1];
            }
            return self::handleResult($res);
        } catch (JsonResponseException $e) {;
            throw $e;
        }

    }

    public static function getTunersBitRates(){

        $response =  HttpRequestHandler::sendRequest('GET', self::getHostname() . '/cgi-bin/status.cgi?cur_time=' . time(), self::getHeaders(), null);

        try {
            $xml = self::handleResponse($response);
            $data = JsonHandler::decode(JsonHandler::encode(simplexml_load_string($xml)));
            $res = [];
            foreach (array_keys($data) as $k) {
                if(stripos($k,"Encoder") === 0) {
                    $parts = explode("_", $k);
                    $tmp = implode("_", array_slice($parts, 1));
                    $res[str_replace("Encoder", "tuner", $parts[0])][$tmp] = $data[$k]["@attributes"]["value"];
                }
            }
            foreach (array_keys($res) as $k) {
                $bitrate = intval($res[$k]["bitrate"]);
                $br_bitrate = intval($res[$k]["br_bitrate"]);
                if($bitrate == 0 || $br_bitrate == 0)
                    $res[$k]["quality"] = strval(0.0);
                else
                    $res[$k]["quality"] = number_format(floatval($br_bitrate) / floatval($bitrate), 2);
            }
            return self::handleResult($res);
        } catch (JsonResponseException $e) {;
            throw $e;
        }

    }

    //TODO: not completed
    public static function getTSIPConfiguration() {
        $postStr = "read=submit&Index=0";

        $response =  HttpRequestHandler::sendRequest('POST', self::getHostname() . '/cgi-bin/tsoip.cgi', self::getHeaders("application/json", "application/x-www-form-urlencoded", strlen($postStr)), $postStr);

        try {
            $xml = self::handleResponse($response);
            $data = JsonHandler::decode(JsonHandler::encode(simplexml_load_string($xml)));
            $res = [];
            foreach (array_keys($data) as $k) {
                if (sizeof($data[$k]) == 1)
                    $res[$k] = $data[$k]["@attributes"]["value"];
                else
                    $res[$k] = $data[$k];
            }
            return self::handleResult($res);
        } catch (JsonResponseException $e) {;
            throw $e;
        }
    }

    //TODO: not completed
    public static function setTSIPConfiguration(string $config) {
        try {
            $tmp = self::getTSIPConfiguration();
        } catch (JsonResponseException $e) {
            throw $e;
        }

        if($tmp["success"] == false)
            self::throwException(12);   //Error getting tsip configuration

        $currentConfig = $tmp["result"];

        $newConfig = JsonHandler::decode($config);

        foreach (array_keys($newConfig) as $k) {
            $currentConfig[$k] = $newConfig[$k];
        }

        $postStr = "iptv_set=submit&Index=0";

        foreach (array_keys($currentConfig) as $k) {
            $postStr = $postStr . "&" . $k . "=" . $currentConfig[$k];
        }

        $response =  HttpRequestHandler::sendRequest('POST', self::getHostname() . '/cgi-bin/tsoip.cgi', self::getHeaders("application/json", "application/x-www-form-urlencoded", strlen($postStr)), $postStr);

        try {
            return self::handleResult(self::handleResponse($response));     // Success response is empty body ( {"success":true,"result":""} ).
        } catch (JsonResponseException $e) {;
            throw $e;
        }

    }

    public static function setRemuxAsTSIPOutput() {

        $config = '{ "iptv_Source" : 8 }';
        try {
            return self::handleResult(self::setTSIPConfiguration($config));     // Success response is empty body ( {"success":true,"result":""} ).
        } catch (JsonResponseException $e) {;
            throw $e;
        }

    }

    //TODO: not completed
    public static function getIPTVConfiguration($onlyPrograms = false) {
        $postStr = "read=submit&language=0";

        $response =  HttpRequestHandler::sendRequest('POST', self::getHostname() . '/cgi-bin/iptv.cgi', self::getHeaders("application/json", "application/x-www-form-urlencoded", strlen($postStr)), $postStr);

        try {
            $xml = self::handleResponse($response);
            $data = JsonHandler::decode(JsonHandler::encode(simplexml_load_string($xml)));
            $res = [];
            if (!$onlyPrograms) {
                foreach (array_keys($data) as $k) {
                    if (sizeof($data[$k]) == 1)
                        $res[$k] = $data[$k]["@attributes"]["value"];
                    else
                        $res[$k] = $data[$k];
                }
                unset($res["iptv_input"]);
                unset($res["iptv_output"]);
            }
            $res["iptv"] = self::extractProgramsArray($data, "iptv_input", "iptv_output");
            return self::handleResult($res);
        } catch (JsonResponseException $e) {;
            throw $e;
        }
    }

    //TODO: not completed
    public static function setIPTVConfiguration($config) {
        try {
            $tmp = self::getIPTVConfiguration();
        } catch (JsonResponseException $e) {
            throw $e;
        }

        if($tmp["success"] == false)
            self::throwException(13);   //Error getting tsip configuration

        $currentConfig = $tmp["result"];

        $newConfig = JsonHandler::decode($config);

        foreach (array_keys($newConfig) as $k) {
            $currentConfig[$k] = $newConfig[$k];
        }

        $postStr = "apply=submit";

        foreach (array_keys($currentConfig) as $k) {
            if($k == "iptv") {
                $vname = "output_checkbox";
                foreach ($currentConfig[$k] as $program) {
                    if ($program["pchecked"] == true)
                        $postStr = $postStr . "&" . $vname . "=" . $program["pid"];
                }
            } else {
                $postStr = $postStr . "&" . $k . "=" . $currentConfig[$k];
            }
        }

        $response =  HttpRequestHandler::sendRequest('POST', self::getHostname() . '/cgi-bin/iptv.cgi', self::getHeaders("application/json", "application/x-www-form-urlencoded", strlen($postStr)), $postStr);

        try {
            return self::handleResult(self::handleResponse($response));     // Success response is empty body ( {"success":true,"result":""} ).
        } catch (JsonResponseException $e) {;
            throw $e;
        }

    }

    //TODO: not completed
    public static function getIPTVProgramConfiguration(){
        try {
            return self::getIPTVConfiguration(true);
        } catch (JsonResponseException $e) {;
            throw $e;
        }
    }

    //TODO: not completed
    public static function setIPTVProgramConfiguration($config) {
        try {
            $tmp = self::getIPTVProgramConfiguration();
        } catch (JsonResponseException $e) {
            throw $e;
        }

        if($tmp["success"] == false)
            self::throwException(13);   //Error getting tsip configuration

        $currentConfig = $tmp["result"];

        $newConfig = JsonHandler::decode($config);

        foreach (array_keys($newConfig) as $k) {
            $currentConfig[$k] = $newConfig[$k];
        }

        $postStr = "apply=submit";

        /*foreach (array_keys($currentConfig) as $k) {

            if(stripos($k, "tuner") === 0) {
                $vname = str_replace("tuner", "Encoder", $k) . "_output_checkbox";
                foreach ($currentConfig[$k] as $program) {
                    if ($program["pchecked"] == true)
                        $postStr = $postStr . "&" . $vname . "=" . $program["pid"];
                }
            } else if($k == "asi" || $k == "ip" || $k == "ip2") {
                $vname = strtoupper($k) . "_output_checkbox";
                foreach ($currentConfig[$k] as $program) {
                    if ($program["pchecked"] == true)
                        $postStr = $postStr . "&" . $vname . "=" . $program["pid"];
                }
            } else {
                $postStr = $postStr . "&" . $k . "=" . $currentConfig[$k];
            }

        }*/

        $response =  HttpRequestHandler::sendRequest('POST', self::getHostname() . '/cgi-bin/iptv.cgi', self::getHeaders("application/json", "application/x-www-form-urlencoded", strlen($postStr)), $postStr);

        try {
            return self::handleResult(self::handleResponse($response));     // Success response is empty body ( {"success":true,"result":""} ).
        } catch (JsonResponseException $e) {;
            throw $e;
        }

    }

}
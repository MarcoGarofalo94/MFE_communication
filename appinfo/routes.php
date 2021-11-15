<?php
/**
 * Create your routes in here. The name is the lowercase name of the controller
 * without the controller part, the stuff after the hash is the method.
 * e.g. page#index -> OCA\CorecomDashboard\Controller\PageController->index()
 *
 * The controller class has to be registered in the application.php file since
 * it's instantiated in there
 */
return [
    'routes' => [
        ['name' => 'page#index', 'url' => '/', 'verb' => 'GET'],
        ['name' => 'page#do_echo', 'url' => '/echo', 'verb' => 'POST'],

        ['name' => 'interface_api#get_tuners_manager_tuners_status', 'url' => '/interface/tuners', 'verb' => 'GET'],

        // teracue tuners api
        ['name' => 'teracue_api#get_tuners_status', 'url' => '/tuners/status', 'verb' => 'GET'],
        ['name' => 'teracue_api#get_tuners_bitrates', 'url' => '/tuners/bitrates', 'verb' => 'GET'],
        ['name' => 'teracue_api#get_tuners_configurations', 'url' => '/tuners/configurations', 'verb' => 'GET'],
        ['name' => 'teracue_api#set_tuners_configurations', 'url' => '/tuners/configurations', 'verb' => 'POST'],

        // teracue remux api
        ['name' => 'teracue_api#get_remux_configuration', 'url' => '/remux/configuration', 'verb' => 'GET'],
        ['name' => 'teracue_api#get_remux_program_configuration', 'url' => '/remux/programs', 'verb' => 'GET'],
        ['name' => 'teracue_api#set_remux_program_configuration', 'url' => '/remux/programs', 'verb' => 'POST'],

        // teracue tsip api
        ['name' => 'teracue_api#get_tsip_configuration', 'url' => '/tsip/configuration', 'verb' => 'GET'],
        ['name' => 'teracue_api#set_tsip_configuration', 'url' => '/tsip/configuration', 'verb' => 'POST'],

        // teracue iptv api
        ['name' => 'teracue_api#get_iptv_configuration', 'url' => '/iptv/configuration', 'verb' => 'GET'],
        ['name' => 'teracue_api#set_iptv_configuration', 'url' => '/iptv/configuration', 'verb' => 'POST'],
        ['name' => 'teracue_api#get_iptv_program_configuration', 'url' => '/iptv/programs', 'verb' => 'GET'],
        ['name' => 'teracue_api#set_iptv_program_configuration', 'url' => '/iptv/programs', 'verb' => 'POST'],

        ['name' => 'teracue_api#set_program_configuration', 'url' => '/programs', 'verb' => 'POST']
    ]
];

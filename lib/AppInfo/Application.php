<?php


namespace OCA\CorecomDashboard\AppInfo;

use OCA\UnimeDocs\Dashboard\DocsWidget;
use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;

class Application extends App implements IBootstrap {

    public const APP_ID = 'corecomdashboard';

    public function __construct(array $urlParams = []) {
        parent::__construct(self::APP_ID, $urlParams);
    }

    public function register(IRegistrationContext $context): void
    {
         $context->registerDashboardWidget(CorecomDashboardWidget::class);
    }

    public function boot(IBootContext $context): void
    {
        // TODO: Implement boot() method.
    }
}
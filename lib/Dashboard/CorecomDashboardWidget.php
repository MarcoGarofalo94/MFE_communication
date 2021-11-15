<?php

namespace OCA\CorecomDashboard\Dashboard;

use OCA\Accessibility\AppInfo\Application as AppInfoApplication;
use OCA\CorecomDashboard\AppInfo\Application;
use OCP\Dashboard\IWidget;
use OCP\IInitialStateService;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\IUserSession;

class CorecomDashboardWidget implements IWidget {

    public function __construct(
        IInitialStateService $initialStateService,
        IL10N $l10n,
        IURLGenerator $urlGenerator
    ) {
        $this->initialStateService = $initialStateService;
        $this->l10n = $l10n;
        $this->urlGenerator = $urlGenerator;
    }

    /**
     * @return string Unique id that identifies the widget, e.g. the app id
     * @since 20.0.0
     */
    public function getId(): string {
        return Application::APP_ID;
    }

    /**
     * @return string User facing title of the widget
     * @since 20.0.0
     */
    public function getTitle(): string {
        return $this->l10n->t('corecomdashboard');
    }

    /**
     * @return int Initial order for widget sorting
     *   in the range of 10-100, 0-9 are reserved for shipped apps
     * @since 20.0.0
     */
    public function getOrder(): int {
        return 0;
    }

    /**
     * @return string css class that displays an icon next to the widget title
     * @since 20.0.0
     */
    public function getIconClass(): string {
        return 'icon-files-dark';
    }

    /**
     * @return string|null The absolute url to the apps own view
     * @since 20.0.0
     */
    public function getUrl(): ?string {
        return null;
    }

    /**
     * Execute widget bootstrap code like loading scripts and providing initial state
     */
    public function load(): void {
        //$this->initialStateService->provideInitialState(AppInfoApplication::APP_ID, 'myData', []);
        \OCP\Util::addScript(Application::APP_ID, 'dashboard');
        \OCP\Util::addStyle(Application::APP_ID, 'dashboard');
    }
}
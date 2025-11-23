<?php

namespace App\Providers;

use App\Events\AnniversaryCommentedEvent;
use App\Events\AnniversaryCommentLikedEvent;
use App\Events\AnniversaryLikedEvent;
use App\Events\CelebrationCommentedEvent;
use App\Events\CelebrationCommentLikedEvent;
use App\Events\CelebrationLikedEvent;
use App\Events\DeathCommentedEvent;
use App\Events\DeathCommentLikedEvent;
use App\Events\DeathLikedEvent;
use App\Events\GraduationCommentedEvent;
use App\Events\GraduationCommentLikedEvent;
use App\Events\GraduationLikedEvent;
use App\Events\MpesaTransactionCreatedEvent;
use App\Events\SuccessCardCommentedEvent;
use App\Events\SuccessCardCommentLikedEvent;
use App\Events\SuccessCardLikedEvent;
use App\Events\WeddingCommentedEvent;
use App\Events\WeddingCommentLikedEvent;
use App\Events\WeddingLikedEvent;
use App\Listeners\AnniversaryCommentedListener;
use App\Listeners\AnniversaryCommentLikedListener;
use App\Listeners\AnniversaryLikedListener;
use App\Listeners\CelebrationCommentedListener;
use App\Listeners\CelebrationCommentLikedListener;
use App\Listeners\CelebrationLikedListener;
use App\Listeners\DeathCommentedListener;
use App\Listeners\DeathCommentLikedListener;
use App\Listeners\DeathLikedListener;
use App\Listeners\GraduationCommentedListener;
use App\Listeners\GraduationCommentLikedListener;
use App\Listeners\GraduationLikedListener;
use App\Listeners\MpesaTransactionCreatedListener;
use App\Listeners\SuccessCardCommentedListener;
use App\Listeners\SuccessCardCommentLikedListener;
use App\Listeners\SuccessCardLikedListener;
use App\Listeners\WeddingCommentedListener;
use App\Listeners\WeddingCommentLikedListener;
use App\Listeners\WeddingLikedListener;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        DeathLikedEvent::class => [DeathLikedListener::class],
        DeathCommentedEvent::class => [DeathCommentedListener::class],
        DeathCommentLikedEvent::class => [DeathCommentLikedListener::class],
        WeddingLikedEvent::class => [WeddingLikedListener::class],
        WeddingCommentedEvent::class => [WeddingCommentedListener::class],
        WeddingCommentLikedEvent::class => [WeddingCommentLikedListener::class],
        GraduationLikedEvent::class => [GraduationLikedListener::class],
        GraduationCommentedEvent::class => [GraduationCommentedListener::class],
        GraduationCommentLikedEvent::class => [GraduationCommentLikedListener::class],
        SuccessCardLikedEvent::class => [SuccessCardLikedListener::class],
        SuccessCardCommentedEvent::class => [SuccessCardCommentedListener::class],
        SuccessCardCommentLikedEvent::class => [SuccessCardCommentLikedListener::class],
        AnniversaryLikedEvent::class => [AnniversaryLikedListener::class],
        AnniversaryCommentedEvent::class => [AnniversaryCommentedListener::class],
        AnniversaryCommentLikedEvent::class => [AnniversaryCommentLikedListener::class],
        CelebrationLikedEvent::class => [CelebrationLikedListener::class],
        CelebrationCommentedEvent::class => [CelebrationCommentedListener::class],
        CelebrationCommentLikedEvent::class => [CelebrationCommentLikedListener::class],
		MpesaTransactionCreatedEvent::class => [MpesaTransactionCreatedListener::class],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return false;
    }
}

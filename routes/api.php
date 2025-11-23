<?php

use App\Http\Controllers\AnniversaryCommentController;
use App\Http\Controllers\AnniversaryCommentLikeController;
use App\Http\Controllers\AnniversaryController;
use App\Http\Controllers\AnniversaryLikeController;
use App\Http\Controllers\CelebrationCommentController;
use App\Http\Controllers\CelebrationCommentLikeController;
use App\Http\Controllers\CelebrationController;
use App\Http\Controllers\CelebrationLikeController;
use App\Http\Controllers\DeathCommentController;
use App\Http\Controllers\DeathCommentLikeController;
use App\Http\Controllers\DeathController;
use App\Http\Controllers\DeathLikeController;
use App\Http\Controllers\FilePondController;
use App\Http\Controllers\GraduationCommentController;
use App\Http\Controllers\GraduationCommentLikeController;
use App\Http\Controllers\GraduationController;
use App\Http\Controllers\GraduationLikeController;
use App\Http\Controllers\KopokopoTransferController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\MpesaTransactionController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RecapController;
use App\Http\Controllers\SuccessCardCommentController;
use App\Http\Controllers\SuccessCardCommentLikeController;
use App\Http\Controllers\SuccessCardController;
use App\Http\Controllers\SuccessCardLikeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserMembershipController;
use App\Http\Controllers\WeddingCommentController;
use App\Http\Controllers\WeddingCommentLikeController;
use App\Http\Controllers\WeddingController;
use App\Http\Controllers\WeddingLikeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

// Route::middleware(['auth:sanctum'])->group(function () {
// Authenticated User
Route::get('auth', [UserController::class, 'auth']);

Route::apiResources([
    "users" => UserController::class,
    "user-memberships" => UserMembershipController::class,
    "memberships" => MembershipController::class,
    'notifications' => NotificationController::class,
    "deaths" => DeathController::class,
    "death-likes" => DeathLikeController::class,
    "death-comments" => DeathCommentController::class,
    "death-comment-likes" => DeathCommentLikeController::class,
    "weddings" => WeddingController::class,
    "wedding-likes" => WeddingLikeController::class,
    "wedding-comments" => WeddingCommentController::class,
    "wedding-comment-likes" => WeddingCommentLikeController::class,
    "graduations" => GraduationController::class,
    "graduation-likes" => GraduationLikeController::class,
    "graduation-comments" => GraduationCommentController::class,
    "graduation-comment-likes" => GraduationCommentLikeController::class,
    "success-cards" => SuccessCardController::class,
    "success-card-likes" => SuccessCardLikeController::class,
    "success-card-comments" => SuccessCardCommentController::class,
    "success-card-comment-likes" => SuccessCardCommentLikeController::class,
    "anniversaries" => AnniversaryController::class,
    "anniversary-likes" => AnniversaryLikeController::class,
    "anniversary-comments" => AnniversaryCommentController::class,
    "anniversary-comment-likes" => AnniversaryCommentLikeController::class,
    "celebrations" => CelebrationController::class,
    "celebration-likes" => CelebrationLikeController::class,
    "celebration-comments" => CelebrationCommentController::class,
    "celebration-comment-likes" => CelebrationCommentLikeController::class,
    "recaps" => RecapController::class,
]);

// Kopokopo STK Push
Route::post("stk-push", [MpesaTransactionController::class, 'stkPush']);
Route::post("kopokopo-initiate-transfer", [KopokopoTransferController::class, 'initiateTransfer']);

Route::apiResources([
	"mpesa-transactions" => MpesaTransactionController::class,
]);

// Filepond Controller
Route::prefix('filepond')->group(function () {
    Route::controller(FilePondController::class)->group(function () {

        // User
        Route::post('avatar/{id}', 'updateAvatar');

        // Media
        Route::post('poster/{type}/{id}', 'storePoster');
        Route::post('photos/{type}/{id}/{limit}', 'storePhotos');
        Route::post('videos/{type}/{id}/{limit}', 'storeVideos');
        Route::post('eulogy/{id}/{limit}', 'storeEulogy');
        Route::post('recaps/{type}/{id}', 'storeRecaps');
        Route::delete('poster/{type}/{id}', 'destoryPoster');
        Route::delete('eulogy/{type}/{id}', 'destoryEulogy');
    });
});

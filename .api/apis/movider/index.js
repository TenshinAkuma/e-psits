"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'movider/1.0 (api/6.1.2)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Send SMS message
     *
     * @summary Send SMS
     * @throws FetchError<400, types.PostSmsResponse400> Bad Request error response
     * @throws FetchError<401, types.PostSmsResponse401> The request did not receive an authenticated respose
     * @throws FetchError<500, types.PostSmsResponse500> System failure
     */
    SDK.prototype.postSms = function (body) {
        return this.core.fetch('/sms', 'post', body);
    };
    /**
     * Send SMS message
     *
     * @summary Send SMS
     * @throws FetchError<400, types.GetSmsResponse400> Bad Request error response
     * @throws FetchError<401, types.GetSmsResponse401> The request did not receive an authenticated respose
     * @throws FetchError<500, types.GetSmsResponse500> System failure
     */
    SDK.prototype.getSms = function (metadata) {
        return this.core.fetch('/sms', 'get', metadata);
    };
    /**
     * Message scheduling functionality gives you the ability to schedule an SMS for a fixed
     * time in the future.
     *
     * @summary Send SMS schedule messages.
     * @throws FetchError<400, types.PostSmsScheduledResponse400> Bad Request error response
     * @throws FetchError<401, types.PostSmsScheduledResponse401> The request did not receive an authenticated respose
     * @throws FetchError<500, types.PostSmsScheduledResponse500> System failure
     */
    SDK.prototype.postSmsScheduled = function (body) {
        return this.core.fetch('/sms/scheduled', 'post', body);
    };
    /**
     * You can also list all scheduled SMS messages. Click 'Try it' then input your **api-key
     * as username and api-secret as password.**
     *
     * @summary List all scheduled SMS messages.
     * @throws FetchError<401, types.GetSmsScheduledResponse401> The request did not receive an authenticated respose
     * @throws FetchError<500, types.GetSmsScheduledResponse500> System failure
     */
    SDK.prototype.getSmsScheduled = function (metadata) {
        return this.core.fetch('/sms/scheduled', 'get', metadata);
    };
    /**
     * Get a detail of schedule SMS message. Click 'Try it' then input your **api-key as
     * username and api-secret as password.**
     *
     * @summary Get a scheduled SMS message.
     * @throws FetchError<404, types.GetSmsScheduledScheduleidResponse404> Content not found
     * @throws FetchError<500, types.GetSmsScheduledScheduleidResponse500> System failure
     */
    SDK.prototype.getSmsScheduledScheduleid = function (metadata) {
        return this.core.fetch('/sms/scheduled/{scheduleId}', 'get', metadata);
    };
    /**
     * Cancel a scheduled SMS message before sending. Click 'Try it' then input your **api-key
     * as username and api-secret as password.**
     *
     * @summary Cancel a scheduled SMS message.
     * @throws FetchError<404, types.DeleteSmsScheduledScheduleidResponse404> Content not found
     * @throws FetchError<500, types.DeleteSmsScheduledScheduleidResponse500> System failure
     */
    SDK.prototype.deleteSmsScheduledScheduleid = function (metadata) {
        return this.core.fetch('/sms/scheduled/{scheduleId}', 'delete', metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;

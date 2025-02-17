declare const DeleteSmsScheduledScheduleid: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly scheduleId: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Numeric ID of the schedule SMS message to get";
                };
            };
            readonly required: readonly ["scheduleId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly api_key: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Your API Key";
                };
                readonly api_secret: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Your API Secret";
                };
            };
            readonly required: readonly ["api_key", "api_secret"];
        }];
    };
    readonly response: {
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "integer";
                            readonly description: "Error code";
                            readonly examples: readonly [3];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Error title";
                            readonly examples: readonly ["ERR_NOT_FOUND"];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Error description";
                            readonly examples: readonly ["Not found."];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "integer";
                            readonly description: "Error code";
                            readonly examples: readonly [1];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Error name";
                            readonly examples: readonly ["ERR_SYSTEM_FAILURE"];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Error description";
                            readonly examples: readonly ["System failure."];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetSms: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly api_key: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Your API key.";
                };
                readonly api_secret: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Your API Secret.";
                };
                readonly to: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number that the message should be sent. Numbers must be specified in E.164 format. Use commas (,) for multiple receivers (the maximum is 1000 numbers).";
                };
                readonly from: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "- The \"from\" field indicates the sender name or brand name used for sending messages to the recipient.\n- If you do not fill a sender name or brand name in the \"from\" field, the system will automatically use the default sender name.\n- You can send SMS messages with your own customized sender name by [registering it with Movider](https://console.movider.co/sender-name/request/?locale=en&callbackUrl=%2Fsender-name%2Frequest).\n- Please note that the \"from\" field is case-sensitive. Ensure the sender name matches the case (lowercase or uppercase) you registered with Movider.\n";
                };
                readonly text: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "- For trial accounts, you are unable to edit the body message or sender name. The system automatically sends a default message with a default sender. If you would like to customize both the message and sender name, please upgrade your account.\n- If you do not provide a sender name, or if the sender name does not match the one in your registration, the system will automatically send a default message with a default sender name. Please ensure that your sender name is correct before sending.\n";
                };
                readonly callback_url: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The webhook endpoint of the delivery report for this SMS to send. This parameter overrides the webhook endpoint set in dashboard.";
                };
                readonly callback_method: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The method of webhook of the delivery report. Choose between GET or POST.";
                };
            };
            readonly required: readonly ["api_key", "api_secret", "to", "text"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly bad_phone_number_list: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly msg: {
                                readonly type: "string";
                                readonly description: "Error description";
                                readonly examples: readonly ["Country Unavailable"];
                            };
                            readonly number: {
                                readonly type: "string";
                                readonly description: "Invalid phone number";
                                readonly examples: readonly ["66812345678"];
                            };
                        };
                    };
                };
                readonly phone_number_list: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly message_id: {
                                readonly type: "string";
                                readonly description: "The unique message id generated by Movider";
                                readonly examples: readonly ["VtznKfqHUjmDCysZyOZDQX"];
                            };
                            readonly number: {
                                readonly type: "string";
                                readonly description: "Mobile phone number to which the SMS was sent";
                                readonly examples: readonly ["66812345678"];
                            };
                            readonly price: {
                                readonly type: "number";
                                readonly description: "SMS price";
                                readonly examples: readonly [0.075];
                            };
                        };
                    };
                };
                readonly remaining_balance: {
                    readonly type: "number";
                    readonly description: "Current account credit balance";
                    readonly examples: readonly [0.075];
                };
                readonly total_sms: {
                    readonly type: "integer";
                    readonly description: "Number of SMS segment in the message";
                    readonly examples: readonly [1];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "integer";
                            readonly description: "Error code";
                            readonly examples: readonly [400];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Error title";
                            readonly examples: readonly ["ERR_INSUFFICIENT_BALANCE"];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Error description";
                            readonly examples: readonly ["Insufficient balance"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "integer";
                            readonly description: "Error code";
                            readonly examples: readonly [403];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Error title";
                            readonly examples: readonly ["ERR_AUTHENTICATION_FAILED"];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Error description";
                            readonly examples: readonly ["Authentication field."];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "integer";
                            readonly description: "Error code";
                            readonly examples: readonly [1];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Error name";
                            readonly examples: readonly ["ERR_SYSTEM_FAILURE"];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Error description";
                            readonly examples: readonly ["System failure."];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetSmsScheduled: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly api_key: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Your API Key";
                };
                readonly api_secret: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Your API Secret";
                };
            };
            readonly required: readonly ["api_key", "api_secret"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                                readonly description: "The schedule ID";
                                readonly examples: readonly [1];
                            };
                            readonly text: {
                                readonly type: "string";
                                readonly description: "The schedule SMS message";
                                readonly examples: readonly ["Scheduled Message 01"];
                            };
                            readonly total_sms: {
                                readonly type: "integer";
                                readonly description: "Total SMS to be sent.";
                                readonly examples: readonly [1];
                            };
                            readonly method: {
                                readonly type: "string";
                                readonly description: "The method of webhook of the delivery report.";
                                readonly examples: readonly ["GET"];
                            };
                            readonly callback_url: {
                                readonly type: "string";
                                readonly description: "The webhook endpoint of the delivery report for this SMS to send.";
                                readonly examples: readonly ["http://yourserver.com/dr"];
                            };
                            readonly from: {
                                readonly type: "string";
                                readonly description: "The sender ID or number the message should be sent from";
                                readonly examples: readonly ["SENDER_ID"];
                            };
                            readonly delivery_date: {
                                readonly type: "string";
                                readonly description: "Date and time when the request has been sent";
                                readonly examples: readonly ["2006-02-01T15:04:05+00:00"];
                            };
                            readonly delivery_status: {
                                readonly type: "string";
                                readonly description: "See all [delivery_status](/reference/schedule-message-status-reference)";
                                readonly examples: readonly ["cancelled"];
                            };
                            readonly delivery_status_update_date: {
                                readonly type: "string";
                                readonly description: "Date and time when the request has been updated";
                                readonly examples: readonly ["2006-02-01T15:04:05+00:00"];
                            };
                            readonly created_date: {
                                readonly type: "string";
                                readonly description: "Date and time when the request has been completed";
                                readonly examples: readonly ["2006-02-01T15:04:05+00:00"];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "integer";
                            readonly description: "Error code";
                            readonly examples: readonly [403];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Error title";
                            readonly examples: readonly ["ERR_AUTHENTICATION_FAILED"];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Error description";
                            readonly examples: readonly ["Authentication field."];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "integer";
                            readonly description: "Error code";
                            readonly examples: readonly [1];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Error name";
                            readonly examples: readonly ["ERR_SYSTEM_FAILURE"];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Error description";
                            readonly examples: readonly ["System failure."];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetSmsScheduledScheduleid: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly scheduleId: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Numeric ID of the schedule SMS message to get";
                };
            };
            readonly required: readonly ["scheduleId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly api_key: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Your API Key";
                };
                readonly api_secret: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Your API Secret";
                };
            };
            readonly required: readonly ["api_key", "api_secret"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                    readonly description: "The schedule ID";
                    readonly examples: readonly [1];
                };
                readonly text: {
                    readonly type: "string";
                    readonly description: "The schedule SMS message";
                    readonly examples: readonly ["Scheduled Message 01"];
                };
                readonly total_sms: {
                    readonly type: "integer";
                    readonly description: "Total SMS to be sent.";
                    readonly examples: readonly [1];
                };
                readonly method: {
                    readonly type: "string";
                    readonly description: "The method of webhook of the delivery report.";
                    readonly examples: readonly ["GET"];
                };
                readonly callback_url: {
                    readonly type: "string";
                    readonly description: "The webhook endpoint of the delivery report for this SMS to send.";
                    readonly examples: readonly ["http://yourserver.com/dr"];
                };
                readonly from: {
                    readonly type: "string";
                    readonly description: "The sender ID or number the message should be sent from";
                    readonly examples: readonly ["SENDER_ID"];
                };
                readonly delivery_date: {
                    readonly type: "string";
                    readonly description: "Date and time when the request has been sent";
                    readonly examples: readonly ["2006-02-01T15:04:05+00:00"];
                };
                readonly delivery_status: {
                    readonly type: "string";
                    readonly description: "See all [delivery_status](/reference/schedule-message-status-reference)";
                    readonly examples: readonly ["cancelled"];
                };
                readonly delivery_status_update_date: {
                    readonly type: "string";
                    readonly description: "Date and time when the request has been updated";
                    readonly examples: readonly ["2006-02-01T15:04:05+00:00"];
                };
                readonly created_date: {
                    readonly type: "string";
                    readonly description: "Date and time when the request has been completed";
                    readonly examples: readonly ["2006-02-01T15:04:05+00:00"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "integer";
                            readonly description: "Error code";
                            readonly examples: readonly [3];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Error title";
                            readonly examples: readonly ["ERR_NOT_FOUND"];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Error description";
                            readonly examples: readonly ["Not found."];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "integer";
                            readonly description: "Error code";
                            readonly examples: readonly [1];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Error name";
                            readonly examples: readonly ["ERR_SYSTEM_FAILURE"];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Error description";
                            readonly examples: readonly ["System failure."];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostSms: {
    readonly formData: {
        readonly type: "object";
        readonly properties: {
            readonly api_key: {
                readonly description: "Your API key.";
                readonly type: "string";
            };
            readonly api_secret: {
                readonly description: "Your API Secret.";
                readonly type: "string";
            };
            readonly to: {
                readonly description: "The number that the message should be sent. Numbers must be specified in E.164 format. Use commas (,) for multiple receivers (the maximum is 1000 numbers).";
                readonly type: "string";
            };
            readonly from: {
                readonly description: "- The \"from\" field indicates the sender name or brand name used for sending messages to the recipient.\n- If you do not fill a sender name or brand name in the \"from\" field, the system will automatically use the default sender name.\n- You can send SMS messages with your own customized sender name by [registering it with Movider](https://console.movider.co/sender-name/request/?locale=en&callbackUrl=%2Fsender-name%2Frequest).\n- Please note that the \"from\" field is case-sensitive. Ensure the sender name matches the case (lowercase or uppercase) you registered with Movider.\n";
                readonly type: "string";
            };
            readonly text: {
                readonly description: "- For trial accounts, you are unable to edit the body message or sender name. The system automatically sends a default message with a default sender. If you would like to customize both the message and sender name, please upgrade your account.\n- If you do not provide a sender name, or if the sender name does not match the one in your registration, the system will automatically send a default message with a default sender name. Please ensure that your sender name is correct before sending.\n";
                readonly type: "string";
            };
            readonly callback_url: {
                readonly description: "The webhook endpoint of the delivery report for this SMS to send. This parameter overrides the webhook endpoint set in dashboard.";
                readonly type: "string";
            };
            readonly callback_method: {
                readonly description: "The method of webhook of the delivery report. Choose between GET or POST.";
                readonly type: "string";
            };
        };
        readonly required: readonly ["api_key", "api_secret", "to", "text"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly bad_phone_number_list: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly msg: {
                                readonly type: "string";
                                readonly description: "Error description";
                                readonly examples: readonly ["Country Unavailable"];
                            };
                            readonly number: {
                                readonly type: "string";
                                readonly description: "Invalid phone number";
                                readonly examples: readonly ["66812345678"];
                            };
                        };
                    };
                };
                readonly phone_number_list: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly message_id: {
                                readonly type: "string";
                                readonly description: "The unique message id generated by Movider";
                                readonly examples: readonly ["VtznKfqHUjmDCysZyOZDQX"];
                            };
                            readonly number: {
                                readonly type: "string";
                                readonly description: "Mobile phone number to which the SMS was sent";
                                readonly examples: readonly ["66812345678"];
                            };
                            readonly price: {
                                readonly type: "number";
                                readonly description: "SMS price";
                                readonly examples: readonly [0.075];
                            };
                        };
                    };
                };
                readonly remaining_balance: {
                    readonly type: "number";
                    readonly description: "Current account credit balance";
                    readonly examples: readonly [0.075];
                };
                readonly total_sms: {
                    readonly type: "integer";
                    readonly description: "Number of SMS segment in the message";
                    readonly examples: readonly [1];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "integer";
                            readonly description: "Error code";
                            readonly examples: readonly [400];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Error title";
                            readonly examples: readonly ["ERR_INSUFFICIENT_BALANCE"];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Error description";
                            readonly examples: readonly ["Insufficient balance"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "integer";
                            readonly description: "Error code";
                            readonly examples: readonly [403];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Error title";
                            readonly examples: readonly ["ERR_AUTHENTICATION_FAILED"];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Error description";
                            readonly examples: readonly ["Authentication field."];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "integer";
                            readonly description: "Error code";
                            readonly examples: readonly [1];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Error name";
                            readonly examples: readonly ["ERR_SYSTEM_FAILURE"];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Error description";
                            readonly examples: readonly ["System failure."];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostSmsScheduled: {
    readonly formData: {
        readonly type: "object";
        readonly properties: {
            readonly api_key: {
                readonly description: "Your API key.";
                readonly type: "string";
            };
            readonly api_secret: {
                readonly description: "Your API Secret.";
                readonly type: "string";
            };
            readonly to: {
                readonly description: "The number that the message should be sent. Numbers must be specified in E.164 format. Use commas (,) for multiple receivers (the maximum is 1000 numbers).";
                readonly type: "string";
            };
            readonly from: {
                readonly description: "- The \"from\" field indicates the sender name or brand name used for sending messages to the recipient.\n- If you do not fill a sender name or brand name in the \"from\" field, the system will automatically use the default sender name.\n- You can send SMS messages with your own customized sender name by [registering it with Movider](https://console.movider.co/sender-name/request/?locale=en&callbackUrl=%2Fsender-name%2Frequest).\n- Please note that the \"from\" field is case-sensitive. Ensure the sender name matches the case (lowercase or uppercase) you registered with Movider.\n";
                readonly type: "string";
            };
            readonly text: {
                readonly description: "- For trial accounts, you are unable to edit the body message or sender name. The system automatically sends a default message with a default sender. If you would like to customize both the message and sender name, please upgrade your account.\n- If you do not provide a sender name, or if the sender name does not match the one in your registration, the system will automatically send a default message with a default sender name. Please ensure that your sender name is correct before sending.\n";
                readonly type: "string";
            };
            readonly delivery_datetime: {
                readonly description: "This parameter indicates when Movider will send a message. Your datetime should be in RFC3339 format `2006-02-01T15:04:05+00:00`.";
                readonly type: "string";
            };
            readonly callback_url: {
                readonly description: "The webhook endpoint of the delivery report for this SMS to send. This parameter overrides the webhook endpoint set in dashboard.";
                readonly type: "string";
            };
            readonly callback_method: {
                readonly description: "The method of webhook of the delivery report. Choose between GET or POST.";
                readonly type: "string";
            };
        };
        readonly required: readonly ["api_key", "api_secret", "to", "text", "delivery_datetime"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly bad_phone_number_list: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly msg: {
                                readonly type: "string";
                                readonly description: "Error description";
                                readonly examples: readonly ["Country Unavailable"];
                            };
                            readonly number: {
                                readonly type: "string";
                                readonly description: "Invalid phone number";
                                readonly examples: readonly ["66812345678"];
                            };
                        };
                    };
                };
                readonly phone_number_list: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly message_id: {
                                readonly type: "string";
                                readonly description: "The unique message id generated by Movider";
                                readonly examples: readonly ["VtznKfqHUjmDCysZyOZDQX"];
                            };
                            readonly number: {
                                readonly type: "string";
                                readonly description: "Mobile phone number to which the SMS was sent";
                                readonly examples: readonly ["66812345678"];
                            };
                            readonly price: {
                                readonly type: "number";
                                readonly description: "SMS price";
                                readonly examples: readonly [0.075];
                            };
                        };
                    };
                };
                readonly remaining_balance: {
                    readonly type: "number";
                    readonly description: "Current account credit balance";
                    readonly examples: readonly [0.075];
                };
                readonly total_sms: {
                    readonly type: "integer";
                    readonly description: "Number of SMS segment in the message";
                    readonly examples: readonly [1];
                };
                readonly scheduledId: {
                    readonly type: "integer";
                    readonly description: "Id of the schedule message";
                    readonly examples: readonly [1];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "integer";
                            readonly description: "Error code";
                            readonly examples: readonly [400];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Error title";
                            readonly examples: readonly ["ERR_INSUFFICIENT_BALANCE"];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Error description";
                            readonly examples: readonly ["Insufficient balance"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "integer";
                            readonly description: "Error code";
                            readonly examples: readonly [403];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Error title";
                            readonly examples: readonly ["ERR_AUTHENTICATION_FAILED"];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Error description";
                            readonly examples: readonly ["Authentication field."];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly code: {
                            readonly type: "integer";
                            readonly description: "Error code";
                            readonly examples: readonly [1];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Error name";
                            readonly examples: readonly ["ERR_SYSTEM_FAILURE"];
                        };
                        readonly description: {
                            readonly type: "string";
                            readonly description: "Error description";
                            readonly examples: readonly ["System failure."];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { DeleteSmsScheduledScheduleid, GetSms, GetSmsScheduled, GetSmsScheduledScheduleid, PostSms, PostSmsScheduled };

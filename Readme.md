# Services(New Web Hooks Concept)

- Aws Image Uploading
- Api Features(pagination,Searching, Filter)
- Encryption Decryption Request And Response
- File Helper
- Jwt Services
- OTP Generator
- Response Handler

### Remaining Services

- Push Notification
- Send OTP Using Firebase/Twilio

# Custom Service

## Custom Exception

- All Exception

## Custom Interceptor

- Encryption Decryption Request And Response

## Custom Interface

# Request Response Handler

## All Success Response Handler

```typescript
return this.responseService.sendSuccessResponse(res, data, 'get');
return this.responseService.sendSuccessResponse(res, data, 'post');
return this.responseService.sendSuccessResponse(res, data, 'put');
return this.responseService.sendSuccessResponse(res, data, 'sendEmail');
return this.responseService.sendSuccessResponse(res, data, 'patch');
return this.responseService.sendSuccessResponse(res, data, 'softdelete');
return this.responseService.sendSuccessResponse(res, data, 'delete');
```

## All Error Response Handler

```typescript
return this.responseService.sendErrorResponse(res, err, 'internal server');
return this.responseService.sendErrorResponse(res, err, 'unauthorized');
return this.responseService.sendErrorResponse(res, err, 'not found');
return this.responseService.sendErrorResponse(res, err, 'wrong credentials');
return this.responseService.sendErrorResponse(res, err, 'empty field');
```

# Templates for Email Sending(Webhooks Testings     )

- Deactivate Account Email
- Login Account email
- Reset Password Email
- Verify Email Using Link
- Successfully Register User Email




















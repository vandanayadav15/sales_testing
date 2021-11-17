export class Props {
  public static APP_NAME: string = 'Tech';
  public static SALT_KEY: string = 'SALT256DL';

  // Accessing Props
  public static ACCESS_READ = 'READ';
  public static ACCESS_WRITE = 'WRITE';

  // Status Props
  public static PLEASE_LOGIN: string = 'Please login.';
  public static TOKEN_MESSAGE: string = 'Please enter the token.';
  public static UNAUTHORISED = "you're not authorised person to do this action";
  public static AUTH_SUCCESS = 'Authentication success';
  public static AUTH_FAILED = 'Authentication unsuccessful';
  public static PASSWORD_VERIFY: string = 'Please update password';
  public static OTP_EXPIRED: string = 'OTP expired';
  public static ACCOUNT_DEACTIVATED: string =
    'Account De-activated Contact Admin';

  // Success Props
  public static SAVED_SUCCESSFULLY: string = 'Saved Successfully.';
  public static REMOVED_SUCCESSFULLY: string = 'Removed Successfully.';
  public static OTP_SENT_SUCCESSFULLY: string = 'OTP sent successfully';
  public static OTP_VERIFY_SUCCESSFULLY: string = 'OTP Verfied successfully';
  public static PASSWORD_SET_SUCCESSFULLY: string =
    'New Password Set Successfully';
  public static EMAIL_SENT_SUCCESSFULLY = 'Email sent successfully';

  // Valid Props
  public static ENTER_VALID_EMAIL: string =
    'Please enter a valid/registered mail ID';

  // No Information Props
  public static NO_INFORMATION: string = 'No information for given data';
  public static NO_HOTEL_ID: string = 'Please provide Hotel ID';
  public static NO_ID: string = 'Please provide id';
  public static NO_NAME: string = 'Please provide Name';
  public static NO_CODE: string = 'Please provide code';
  public static PROFILE_NOT_FOUND: string =
    "Didn't find any profile with the provided email";
  public static MISS_MATCH_MESSAGE: string =
    'Some one updated the recored, please do refresh and continue.';

  // Invalid Props
  public static INVALID_DATA: string = 'Please enter valid data.';
  public static INVALID_AUTH: string = 'Your not a valid Auth.';
  public static INVALID_PASSWORD: string = 'Invalid Password';
  public static INVALID_USER: string = 'Invalid User';
  public static INVALID_TOKEN: string = 'Please Enter Valid Token';
  public static INVALID_CODE: string = 'Please enter code';
  public static INVALID_ID: string = 'Please provide id';
  public static INVALID_JWT: string = 'Invalid jwt';
  public static INVALID_CREDENTIALS: string = 'Invalid Credentials';

  // Exists Props
  public static MOBILE_EXISTS: string = 'Your mobile already exists';
  public static EMAIL_EXISTS: string = 'Your email already exists';
  public static RECORD_EXISTS: string = 'Record already exists';
  public static RECORD_NOT_EXISTS: string = 'Record not exists';

  // Track status Props
  public static TRACK_STATUS_NEW: string = 'NEW';
  public static TRACK_STATUS_PROCESSING: string = 'PROCESSING';
  public static TRACK_STATUS_COMPLETE: string = 'COMPLETE';
  public static TRACK_STATUS_CANCEL: string = 'CANCEL';
  public static TRACK_STATUS_PAID: string = 'PAID';
  public static TRACK_STATUS_REFUND: string = 'REFUND';
  public static TRACK_STATUS_REPAID: string = 'REPAID';
  public static TRACK_STATUS_DISCONNECT: string = 'DISCONNECT';
  public static TRACK_STATUS_BOOKING: string = 'BOOKING';
  public static TRACK_STATUS_CHECK_IN: string = 'CHECK IN';
  public static TRACK_STATUS_CHECK_OUT: string = 'CHECK OUT';

  // Profile Status Props
  public static PROFILE_STATUS_VERIFIED: string = 'VERIFIED';
  public static PROFILE_STATUS_INPROGRESS: string = 'INPROGRESS';
  public static PROFILE_STATUS_UNVERIFIED: string = 'UNVERIFIED';
  public static PROFILE_STATUS_CHANGE_REQUIRED: string = 'CHANGE_REQUIRED';

  //Technical Props
  public static RESET_TECHNICAL_ISSUE: string =
    'Technical issue for reset, Sorry for Inconvience';
}

import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  groups: [
    // 시스템 관리자
    'admin',
    'manager',
    
    // 고객사별 그룹 - 삼성전자
    'samsung-admin',
    'samsung-manager', 
    'samsung-user',
    
    // 고객사별 그룹 - LG전자
    'lg-admin',
    'lg-manager',
    'lg-user',
    
    // 고객사별 그룹 - 현대자동차
    'hyundai-admin',
    'hyundai-manager',
    'hyundai-user'
  ]
});

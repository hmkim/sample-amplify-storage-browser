import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'myStorageBucket',
    isDefault: true,
    access: (allow) => ({
        // 시스템 관리자 전용 영역
        'admin/*': [
            allow.groups(['admin']).to(['read', 'write', 'delete'])
        ],

        // 시스템 매니저 영역 - 모든 고객사 데이터 읽기 가능
        'manager/*': [
            allow.groups(['admin', 'manager']).to(['read', 'write', 'delete'])
        ],

        // === 삼성전자 고객사 영역 ===
        'clients/samsung/admin/*': [
            allow.groups(['admin', 'manager', 'samsung-admin']).to(['read', 'write', 'delete'])
        ],

        'clients/samsung/data/*': [
            allow.groups(['admin', 'manager', 'samsung-admin', 'samsung-manager']).to(['read', 'write', 'delete']),
            allow.groups(['samsung-user']).to(['read', 'write'])
        ],

        'clients/samsung/reports/*': [
            allow.groups(['admin', 'manager', 'samsung-admin', 'samsung-manager', 'samsung-user']).to(['read']),
            allow.groups(['samsung-admin', 'samsung-manager']).to(['write', 'delete'])
        ],

        // === LG전자 고객사 영역 ===
        'clients/lg/admin/*': [
            allow.groups(['admin', 'manager', 'lg-admin']).to(['read', 'write', 'delete'])
        ],

        'clients/lg/data/*': [
            allow.groups(['admin', 'manager', 'lg-admin', 'lg-manager']).to(['read', 'write', 'delete']),
            allow.groups(['lg-user']).to(['read', 'write'])
        ],

        'clients/lg/reports/*': [
            allow.groups(['admin', 'manager', 'lg-admin', 'lg-manager', 'lg-user']).to(['read']),
            allow.groups(['lg-admin', 'lg-manager']).to(['write', 'delete'])
        ],

        // === 현대자동차 고객사 영역 ===
        'clients/hyundai/admin/*': [
            allow.groups(['admin', 'manager', 'hyundai-admin']).to(['read', 'write', 'delete'])
        ],

        'clients/hyundai/data/*': [
            allow.groups(['admin', 'manager', 'hyundai-admin', 'hyundai-manager']).to(['read', 'write', 'delete']),
            allow.groups(['hyundai-user']).to(['read', 'write'])
        ],

        'clients/hyundai/reports/*': [
            allow.groups(['admin', 'manager', 'hyundai-admin', 'hyundai-manager', 'hyundai-user']).to(['read']),
            allow.groups(['hyundai-admin', 'hyundai-manager']).to(['write', 'delete'])
        ],

        // === 공통 영역 ===
        // 공개 문서 - 모든 고객사가 읽을 수 있는 공통 자료
        'shared/public-docs/*': [
            allow.groups(['admin', 'manager']).to(['read', 'write', 'delete']),
            allow.groups(['samsung-admin', 'samsung-manager', 'samsung-user',
                'lg-admin', 'lg-manager', 'lg-user',
                'hyundai-admin', 'hyundai-manager', 'hyundai-user']).to(['read'])
        ],

        // 템플릿 영역 - 고객사들이 사용할 수 있는 템플릿
        'shared/templates/*': [
            allow.groups(['admin', 'manager']).to(['read', 'write', 'delete']),
            allow.groups(['samsung-admin', 'samsung-manager',
                'lg-admin', 'lg-manager',
                'hyundai-admin', 'hyundai-manager']).to(['read'])
        ],

        // 개인 영역 - 각 사용자의 개인 파일
        'private/{entity_id}/*': [
            allow.entity('identity').to(['read', 'write', 'delete'])
        ],

        // 임시 업로드 영역 - 모든 인증된 사용자
        'temp/{entity_id}/*': [
            allow.entity('identity').to(['read', 'write', 'delete'])
        ]
    })
});

export const secondaryStorage = defineStorage({
    name: 'mySecondaryStorageBucket',
    access: (allow) => ({
        // 시스템 백업 영역
        'backup/system/*': [
            allow.groups(['admin', 'manager']).to(['read', 'write', 'delete'])
        ],

        // 고객사별 백업 영역
        'backup/clients/samsung/*': [
            allow.groups(['admin', 'manager', 'samsung-admin']).to(['read', 'write', 'delete']),
            allow.groups(['samsung-manager']).to(['read'])
        ],

        'backup/clients/lg/*': [
            allow.groups(['admin', 'manager', 'lg-admin']).to(['read', 'write', 'delete']),
            allow.groups(['lg-manager']).to(['read'])
        ],

        'backup/clients/hyundai/*': [
            allow.groups(['admin', 'manager', 'hyundai-admin']).to(['read', 'write', 'delete']),
            allow.groups(['hyundai-manager']).to(['read'])
        ],

        // 개인 백업 영역
        'backup/private/{entity_id}/*': [
            allow.entity('identity').to(['read', 'write', 'delete'])
        ]
    })
});




<?php

class Certificate
{
    public function verify(string $code): array
    {
        $normalized = strtoupper(trim($code));
        $validCodes = [
            'KSMYSD-ORG-7F4K9Q2M',
            'KSMYSD-ORG-2NV8LQ4A',
            'KSMYSD-ORG-1J7CRDX9',
        ];

        if (!in_array($normalized, $validCodes, true)) {
            return [
                'status' => 'not_found',
                'message' => 'Certificate not found or invalid.',
                'publicData' => null,
            ];
        }

        return [
            'status' => 'valid',
            'message' => 'Certificate found and verified.',
            'publicData' => [
                'organization' => 'Kano Youth Action Forum',
                'code' => $normalized,
                'issue_date' => '2026-10-12',
                'certificate_status' => 'valid',
                'district' => 'Kano Central',
            ],
        ];
    }
}

<?php

class CertificateController extends Controller
{
    public function index(Request $request): string
    {
        $code = trim((string) ($request->query['code'] ?? ''));
        $result = (new Certificate())->verify($code);

        return $this->view('public/verify', [
            'result' => $result,
            'submittedCode' => $code,
        ]);
    }

    public function submit(Request $request): string
    {
        $code = trim((string) ($request->body['code'] ?? ''));

        if ($code === '') {
            return $this->view('public/verify', [
                'result' => [
                    'status' => 'invalid',
                    'message' => 'Please enter a valid verification code.',
                    'publicData' => null,
                ],
                'submittedCode' => '',
            ]);
        }

        $result = (new Certificate())->verify($code);
        return $this->view('public/verify', [
            'result' => $result,
            'submittedCode' => $code,
        ]);
    }
}

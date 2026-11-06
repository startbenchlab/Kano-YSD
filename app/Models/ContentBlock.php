<?php

class ContentBlock
{
    public function latestNews(): array
    {
        return [
            [
                'title' => 'Youth skills bootcamp opens for applications',
                'summary' => 'Applications for the next community digital and enterprise training cycle are now open across six LGAs.',
                'date' => '14 Nov 2026',
            ],
            [
                'title' => 'Ministry launches sports and wellness outreach',
                'summary' => 'A state-wide programme aims to support youth sports participation and local talent development.',
                'date' => '09 Nov 2026',
            ],
            [
                'title' => 'Community engagement drive expands to northern districts',
                'summary' => 'Ministry teams continue outreach to strengthen collaboration with registered youth bodies.',
                'date' => '03 Nov 2026',
            ],
        ];
    }

    public function programmes(): array
    {
        return [
            ['name' => 'Digital Skills for Youth', 'type' => 'Training'],
            ['name' => 'Sports Talent Development', 'type' => 'Development'],
            ['name' => 'Community Volunteer Initiative', 'type' => 'Service'],
            ['name' => 'Creative Arts Fellowship', 'type' => 'Culture'],
        ];
    }
}

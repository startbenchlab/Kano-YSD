<?php

class Organization
{
    public function publicDirectory(): array
    {
        return [
            [
                'name' => 'Kano Youth Action Forum',
                'category' => 'Community youth association',
                'district' => 'Kano Central',
                'lga' => 'Nassarawa',
                'ward' => 'Gama',
                'description' => 'Youth empowerment, leadership and civic engagement network across the metropolis.',
                'status' => 'Approved',
                'year_established' => '2016',
            ],
            [
                'name' => 'Kano Sports Vision Club',
                'category' => 'Sports club',
                'district' => 'Kano South',
                'lga' => 'Dala',
                'ward' => 'Danbare',
                'description' => 'Community sports and youth fitness programmes for teens and young adults.',
                'status' => 'Approved',
                'year_established' => '2014',
            ],
            [
                'name' => 'Creative Youth Network Kano',
                'category' => 'Arts and culture',
                'district' => 'Kano North',
                'lga' => 'Tarauni',
                'ward' => 'Ado',
                'description' => 'Creative arts, digital skills and cultural preservation initiative.',
                'status' => 'Approved',
                'year_established' => '2018',
            ],
            [
                'name' => 'SME Generation Kano',
                'category' => 'Entrepreneurship and business',
                'district' => 'Kano Central',
                'lga' => 'Gwale',
                'ward' => 'Kurna',
                'description' => 'Supporting youth enterprise, digital skills and business incubation.',
                'status' => 'Approved',
                'year_established' => '2019',
            ],
        ];
    }

    public function stats(): array
    {
        return [
            ['label' => 'Registered organizations', 'value' => '1,248'],
            ['label' => 'LGAs covered', 'value' => '44'],
            ['label' => 'Active programmes', 'value' => '36'],
            ['label' => 'Verified certificates', 'value' => ' 892'],
        ];
    }
}

import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/save', () => {
    return HttpResponse.json({ name: 'John Maverick' });
  }),
  http.get('/api/load', () => {
    return HttpResponse.json({
      range: {
        startDate: '2025-03-01',
        endDate: '2025-06-02',
      },
      people: [
        {
          id: 23,
          name: 'Hart Haasdasgerty',
          avatar: 'https://img.daisyui.com/images/profile/demo/2@94.webp',
          role: 'Frontend',
        },
        {
          id: 25,
          name: 'Brice Swyre',
          avatar: 'https://img.daisyui.com/images/profile/demo/3@94.webp',
          role: 'Backend',
        },
        {
          id: 54,
          name: 'Marjy Ferencz',
          avatar: 'https://img.daisyui.com/images/profile/demo/4@94.webp',
          role: 'QA',
        },
      ],
      tasks: [
        { id: 123, person: 23, title: 'ENG-41: Seek first', description: 'foo', days: 2, startDate: '2025-03-04', color: 'blue' },
        { id: 456, person: 25, title: 'ENG-42: Seek first', description: 'bar', days: 4, startDate: '2025-04-04', color: 'green' },
        { id: 789, person: 23, title: 'ENG-43: Seek first', description: 'baz', days: 5, startDate: '2025-04-16', color: 'red' },
      ],
    });
  }),
];

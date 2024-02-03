import { StatusList } from "../types";
import { getUniqId } from "../utils";

export const MockIPR = {
  id: 10,
  title: "Качаем Soft skills",
  employee: {
    fullName: "Иванов Иван Иванович",
    position: "Ведущий специалист по тестированию",
    avatar: "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg"
  },
  author: "Иванов Иван Иванович",
  description: "Вот список всех книг, которые ты должен прочесть до пятницы...",
  status: "Failed",
  created_date: "2024-01-29T03:31:55.675Z",
  start_date: "2024-01-29",
  end_date: "2024-01-29"
}

export const MockNoIPR = {
  id: 10,
  employee: {
    fullName: "Иванов Иван Иванович",
    position: "Ведущий специалист по тестированию",
    avatar: "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg"
  },
}

export const dataForFilterText = [
  {
    id: 1,
    username: "User01",
    first_name: "Саша",
    last_name: "Петров",
    patronymic: "Иванович",
    email: "john@email.com",
    position: "Junior product manager",
    photo: "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg",
    superior: [
      {
        id: 1,
        name: "Петров Иван Иванович"
      }
    ],
    subordinates: [
      {
        id: 1,
        name: "Петров Иван Иванович"
      }
    ]
  },
  {
    id: 111111111111111,
    username: "User01",
    first_name: "Саша",
    last_name: "Петров",
    patronymic: "Иванович",
    email: "john1132@email.com",
    position: "Junior product manager",
    photo: "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg",
    superior: [
      {
        id: 1,
        name: "Петров Иван Иванович"
      }
    ],
    subordinates: [
      {
        id: 1,
        name: "Петров Иван Иванович"
      }
    ]
  },
  {
    id: 2,
    username: "User01",
    firs_tname: "Ив11111111111ан",
    last_name: "Ива11111111нов",
    patronymic: "Ив1212121анович",
    email: "john@email.com",
    position: "Junior product manager",
    photo: "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg",
    superior: [
      {
        id: 1,
        name: "Петров Иван Иванович"
      }
    ],
    subordinates: [
      {
        id: 1,
        name: "Петров Иван Иванович"
      }
    ]
  },
  {
    id: 3,
    username: "User01",
    first_name: "Иван123",
    last_name: "Иванов123",
    patronymic: "Иванович123",
    email: "john@email.com",
    position: "Junior product manager",
    photo: "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg",
    superior: [
      {
        id: 1,
        name: "Петров Иван Иванович"
      }
    ],
    subordinates: [
      {
        id: 1,
        name: "Петров Иван Иванович"
      }
    ]
  },
  {
    id: 4,
    username: "User01",
    first_name: "Иван333",
    last_name: "Иванов333",
    patronymic: "Иванович333",
    email: "john@email.com",
    position: "Junior product manager",
    photo: "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg",
    superior: [
      {
        id: 1,
        name: "Петров Иван Иванович"
      }
    ],
    subordinates: [
      {
        id: 1,
        name: "Петров Иван Иванович"
      }
    ]
  },
  {
    id: 5,
    username: "User01",
    first_name: "Иван---",
    last_name: "Иванов---",
    patronymic: "Иванович---",
    email: "john@email.com",
    position: "Junior product manager",
    photo: "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg",
    superior: [
      {
        id: 1,
        name: "Петров Иван Иванович"
      }
    ],
    subordinates: [
      {
        id: 1,
        name: "Петров Иван Иванович"
      }
    ]
  },
  {
    id: 6,
    username: "User01",
    first_name: "Иван",
    last_name: "Иванов",
    patronymic: "Иванович",
    email: "john@email.com",
    position: "Junior product manager",
    photo: "https://chillywilly.club/uploads/posts/2023-03/thumbs/1678626035_chillywilly-club-p-portret-merlin-monro-pop-art-art-krasivo-d-62.jpg",
    superior: [
      {
        id: 1,
        name: "Петров Иван Иванович"
      }
    ],
    subordinates: [
      {
        id: 1,
        name: "Петров Иван Иванович"
      }
    ]
  },
];

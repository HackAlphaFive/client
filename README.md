# Индивидуальные Планы Развития (ИПР) - Frontend Репозиторий Команды №5

## О Проекте
Этот проект был разработан для Альфа-Банка, ведущей Fintech-компании, и представляет собой сервис для создания, просмотра, и валидации индивидуальных планов развития (ИПР) сотрудников. Сервис предлагает две роли: руководитель и сотрудник, обеспечивая возможность эффективного управления и отслеживания профессионального роста внутри организации.

![Screenshots](https://github.com/HackAlphaFive/client/assets/105168167/54c7131c-bc27-4cd8-b08e-0f3517594085)

### Основные Функции
- **Для руководителей:**
  - Просмотр списка сотрудников со статусами ИПР.
  - Создание и редактирование ИПР, включая задачи с дедлайнами и комментариями.
  - Отслеживание статусов выполнения ИПР и взаимодействие с сотрудниками через комментарии.

- **Для сотрудников:**
  - Просмотр списка задач в рамках ИПР.
  - Возможность оставлять комментарии к задачам.

### Технологии
Проект разработан с использованием следующих технологий:
- **TypeScript** для типизации и повышения качества кода.
- **React** для построения интерфейса.
- **Redux & Redux Toolkit** для управления состоянием приложения.
- **React Router** для навигации.
- **UI Kit - Core Components** для дизайна интерфейса.

## Начало Работы

### Предварительные Требования
Для работы с проектом убедитесь, что у вас установлены:
- Node.js последней версии
- npm или yarn

### Установка
1. Клонируйте репозиторий

```
git clone https://github.com/HackAlphaFive/client.git
```

2. Перейдите в каталог проекта

```
cd client
```

3. Установите зависимости

```
npm install
```

или

```
yarn install
```

### Запуск проекта
Запустите проект локально с помощью команды:
```
npm start
```
или
```
yarn start
```

Приложение будет доступно по адресу `http://localhost:3000`.

## Разработка

### Структура Проекта

Проект организован следующим образом:

- `src`: Исходный код приложения
  - `assets`: Изображения используемые в проекте.
  - `components`: Повторно используемые компоненты React.
  - `pages`: Компоненты страниц, каждый соответствует маршруту в приложении.
  - `services`: Сервисы для управления запросами к API и бизнес-логикой.
    - `middlewares`: Промежуточное ПО для Redux.
    - `selectors`: Селекторы Redux для извлечения данных из состояния.
    - `slices`: Redux slices, содержащие редьюсеры и действия.
  - `utils`: Вспомогательные функции, утилиты и константы.
- `App.module.css`: Стили для корневого компонента.
- `App.tsx`: Корневой компонент приложения.

- `public`: Публичные файлы, такие как `index.html`.


### Стилизация
* [UI Kit заказчика](https://core-ds.github.io/core-components/master/?path=/docs/instructions-installation--docs)
* [Figma команды дизайнеров](https://www.figma.com/file/IQp1iggI9ttZYN4Bp9FRbA/%D0%94%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD-ALFA-%D0%98%D0%9F%D0%A0?type=design&node-id=326-12643&mode=design&t=7qgGkH5Ixp97kBR8-0)

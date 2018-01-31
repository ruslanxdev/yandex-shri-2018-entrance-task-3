# Приложение для создания и редактирования информации о встречах сотрудников

Написано для Node.js 8 и использует библиотеки:

- express
- sequelize
- graphql
- react
- apollo-client
- react-router

## Задание

В первом задании вы подготовили бэкенд, во втором — вёрстку. Цель третьего задания — реализовать одностраничное приложение «Яндекс Переговорки», которое будет использовать все наработки из предыдущих заданий. Приложение должно обладать всей функциональностью, изображённой на макете из второго задания.

- [x] Необходимо реализовать следующие переходы между макетами:

  - [x] При клике по свободному «слоту» в списке переговорок происходит переход на форму создания встречи с заполненным временем проведения и названием переговорки; если пользователь меняет время, выбранная переговорка заменяется на блок рекомендаций — о нём ниже.
  - [x] При клике по кнопке «Создать встречу» также происходит переход на форму создания встречи, но без заполненных полей (блок рекомендаций отсутствует и появляется только после ввода времени проведения встречи).

- [ ] Для блока рекомендаций необходимо реализовать функцию getRecommendation ([описание интерфейса](https://gist.github.com/alt-j/f4dea60bad6a8774d982bc6b52184a08)), которая будет подбирать подходящие переговорки для встречи, учитывая:

  - количество участников и вместимость переговорок;
  - близость переговорки ко всем участникам встречи (первыми в списке должны быть переговорки, для которых суммарное количество пройдённых всеми участниками этажей будет минимальным).

  Если все подходящие переговорки заняты, необходимо проверить, возможно ли освободить какую-то из них: а) Может быть, можно перенести встречу из неё в другую переговорку (например, меньших размеров). б) Если переговорки заняты не на весь период времени, стоит попробовать освободить одну из них, перенеся встречи в другие подходящие переговорки. Например, есть встреча с 11:00 до 12:00 и есть две подходящие переговорки А (занята с 11:00 до 11:30) и B (занята c 11:30 до 12:00). В таком случае можно перенести получасовую встречу из A в B, чтобы освободить А, или перенести встречу из B в A, чтобы освободить B. Вариант выбираем так, чтобы суммарное количество пройдённых всеми участниками этажей было минимальным.

  Если не удалось найти никаких вариантов, необходимо выбрать подходящие переговорки, которые освободятся раньше других.

- [ ] Всевозможные сценарии обработки некорректных данных, введённых пользователем, и системных ошибок, не описанных во втором задании, мы предлагаем продумать самостоятельно и спроектировать в качестве необязательного задания.

Мы не ограничиваем вас в выборе технологий, фреймворков и библиотек. Пожалуйста, для каждого выбранного инструмента напишите небольшое обоснование — зачем он нужен в вашем проекте и почему именно он.

Мы будем оценивать реализацию функциональности, а также:

- оформление кода;
- архитектуру приложения;
- организованную вами инфраструктуру для разработки;
- наличие и качество тестов;
- performance.

## Запуск

```
npm i
npm run build
npm start
```

Для разработки (запускается параллельно):

```
npm run dev:server
```
```
npm run dev:start
```

Для сброса данных в базе:

```
npm run reset-db
```

## Выполнение задания

### 1. Инфраструктура

Решил начать разработку приложения сразу с установления связи с сервером.

В качестве генератора и сборщика приложения выбрал [Create React App](https://github.com/facebook/create-react-app). Хотя я и настроил свою инфраструктуру в предыдущем задании, но на это ушло слишком много времени, и в этом задании мне не хотелось тратить на это много времени. Так же этого решение связано с выбором React-а.

### 2. Архитектура

В качестве архитектуры использовал компонентый подход. В качетсве методологии — БЭМ.

#### Фреймворки и библиотеки

- [React](https://github.com/facebook/react). Для создания **интерфейсов** решил использовать React. У меня не так много опыта использования этой библиотеки, и был соблазн написать всё на чистом JS, но времени остлось уже слишком мало для этого. А так же мне хотелось попробовать написать хотя бы одно приложение на React-е.
- [Redux](https://github.com/reactjs/redux). Для хранения **состояния** приложения решил использовать Redux. А то не очень удобно передавать состояния по цепочке вложенных компонентов.
- [Apollo client](https://github.com/apollographql/apollo-client). Для **общения с сервером** при помощи graphql решил использовать Apollo. Так как я не особо знаком с graphql, то выбрал первую библиотеку, у которой наиболее подробная документация и есть интерграция с React-ом.
- [React Router](https://github.com/ReactTraining/react-router). Для **маршрутизации** выбрал React Router, что обсловлено выбором React-а и наличием двух страниц, между котороми необходимо осуществлять переходы.

#### Помощники

- **BEMHelper**. Позволяет создавать сущности блоков по методологии наименования классов БЭМ. Они хранят в себе информацию о классах этих блоков. Два метода `block` и `elem` компилируют нужные классы в зависимости от передаваемых параметров.
- **pluralHelper**. Позволяет создавать тегированные шаблонные строки для плюрализации строк. Необходимо для правильного склонения числительных.
- **calcSlotsProps**. Помогает высчитывать свойства для отрисовки слотов в зависимости от времени событий в данный период.

### 3. Сервер

- [x] В файле `create-mock-data.js` поправил дату окончания события, которая раньше даты начала.
- [ ] Добавить поле `name` в тип `User`, чтобы было ближе к макету, пока что поставил `login`.

### 4. Итоги

Реализовал минимальное жизнеспособное приложение, с помощью которого можно создавать/редактировать/удалять встречи.

Сделал:

- Переходы между страницами.
- Отображение данных с сервера.
- Создание/редактирование/удаление встреч.
- Общая валидация формы.
- Отображение модальных окон.

Осталось сделать (помимо тудулиста):

- Мобильная версия.
- Рекоммендации переговорок.
- Компонент `Calendar` для `DatePicker` и `Input` (тип: `date`).

Главной целью было — сделать приложение, которое работает.

### 5. Todolist

#### 0.1.0

- [x] Поправить время в форме редактирования встречи.
- [x] Поправить отображение комнаты в форме при выборе пустого слота в этой комнате.
- [x] Добавить изменение состояния в зависимости от введенных данных в `EventForm`.
- [x] Добавить общую валидацию `EventForm`.
- [x] Реализовать создание/редактирование/удаление (запись в базу данных) встреч.
- [x] Добавить обновление данных с сервера, каждые 1000мс. Возможно, это слишком часто.

#### 0.2.0


- [x] Сделать отображение модальных окон.
- [ ] Добавить группировку комнат по этажам.
- [ ] Добавить миксин `disabled: true` для всех слотов, в которых нет событий, но их дата прошла. А так же разделять слоты на двое по текущей дате.
- [ ] Добавить миксин `disabled: true` для комнат у которых все слоты уже заняты или время уже вышло.
- [ ] Поправить в Safari открытие `tooltip`. Реализовать это через JS.
- [ ] Проверить в Safari обработку данных в `EventForm`.

#### 0.3.0

- [ ] Интегрировать в сборку и файловую структуру поправленные стили, когда они будут готовы.
- [ ] Написать graphql query, который будет выдавать отсортированные по определенным критериям данные (например `events` не по `id`, а по `dateStart`).
- [ ] Поправить отображение `tooltip`, так чтобы он не вылезал за край экрана.
- [ ] Добавить обновление данных `apollo` после создания/реактирования/удаления встреч, чтобы при переходе на главную страницу данные уже были обновленные. Сейчас нужно ждать 1000мс, и с этим интервалом он будет всегда подгружать эти данные.
- [ ] Добавить проверку перед созданием/редактированием встречи через запрос на сервер, возможно ли создать эту встречу, не занял ли кто уже выбранную переговорку.
- [ ] Добавить валидацию формы.

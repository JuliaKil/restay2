# Restay
## 2.Введение
2.1. Наименование программы: Restay 

2.2. Назначение и область применения: путешествия. 
## 4.Назначение и цели создания системы
4.1. Назначение разработки: веб-приложение для планирования событий во время путешествия (трансфер, места для посещения и пр.). 

4.2 Цели создания: организация упорядоченного представления информации о поездке и учета расходов. 
## 6.Условия эксплуатации
6.1.Требования к квалификации и численности персонала: 

Для использования приложения достаточно одного зарегистрированного пользователя, не обладающего специальной квалификацией. Администрирование сайта происходит непосредственно разработчиком. Пользователь имеет доступ через пользовательский интерфейс только к тем данным, которые принадлежат его учетной записи. Приложение позволяет пользователю создавать свою учетную запись и входить в нее, заносить информацию о трансфере (тип, маршрут, время отправления и прибытия и пр.), отеле (название, время заселения и выезда и пр.), местах для посещения (название, стоимость входа и пр.), также организует упорядоченное представление этих данных, и дает возможность их корректирования и учета расходов. В приложении может быть сохранена и удобно представлена информация о нескольких поездках. Также приложение может автоматически добавить новое событие в необходимое место во временной линии и пересчитать расходы. 
## 7.Требования к защите информации и программ
7.1. Требования к защите информации от несанкционированного доступа:  

У пользователя нет доступа к информации о других пользователях. Пользователь не имеет прав на изменение информации, не относящейся к его учетной записи. 

7.2. Требования к сохранности информации: 

При возникновении аварийных ситуаций информация должна сохранять свою целостность, и работы по восстановлению не должны повлечь за собой потерю данных. 
## 12.Разработка проекта системы баз данных
12.1. Требования к составу данных: 

Данные о пользователе (логин, пароль и пр.); 

Данные о трансфере (тип, маршрут, время вылета и прибытия и пр.); 

Данные об отеле (название, время заселения и выселения и пр.); 

Данные о месте для посещения (название, предполагаемая дата и время посещения и пр.). 

12.2. Требования к представлению информации: 

Информация представляется в виде реляционной базы данных.

12.3. Требования по применению СУБД: 

Поддержка реляционной модели БД 

Импорт и экспорт данных 

Обеспечение безопасности данных на уровне сервера 
## 13.Заполнение базы данных информацией
13.1. Требования к заполнению базы данных: 

Заполнение базы данных информацией производится посредством предоставляемой пользователем через пользовательский интерфейс информации. 

13.2. Требования к источникам информации: 

Источником информации являются пользовательские данные. 

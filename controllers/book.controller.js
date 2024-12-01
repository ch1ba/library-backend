const { Book } = require('../models'); // Импортируем модель Book
var globalFunctions = require('../config/global.functions.js');
const { Op } = require('sequelize'); // Импортируем операторы Sequelize


// Получение всех книг (если есть то с сортом)
exports.findAll = (req, res) => {
    const titleFilter = req.query.title;  // Получаем параметр title из запроса
    const sortParam = req.query.sortBy;   // Получаем параметр sortBy из запроса

    let order = [];

    // Проверяем, передан ли параметр sortBy и его формат
    if (sortParam) {
        const [field, direction] = sortParam.split('='); // Разделяем на поле и направление

        // Проверяем корректность поля и направления
        if ((field === 'title' || field === 'price') && (direction === 'asc' || direction === 'desc')) {
            order.push([field, direction]);  // Добавляем в массив order
        }
    }

    // Выполняем запрос на получение всех книг с фильтрацией по заголовку и заданной сортировкой
    Book.findAll({
        where: titleFilter ? { title: { [Op.like]: `%${titleFilter}%` } } : {}, // Фильтрация по заголовку
        order: order
    })
    .then(objects => {
        if (objects.length === 0 && titleFilter) {
            return globalFunctions.sendResult(res, { message: "Книги с таким названием не найдены." });
        }
        globalFunctions.sendResult(res, objects);  // Возвращаем найденные книги
    })
    .catch(err => {
        globalFunctions.sendError(res, err);  // Обрабатываем ошибки
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Book.findByPk(id)
        .then(object => {
            if (!object) {
                return globalFunctions.sendError(res, { message: `Книга с id=${id} не найдена.` });
            }
            globalFunctions.sendResult(res, object);
        }).catch(err => {
            globalFunctions.sendError(res, err);
        });
};


// Добавление новой книги

exports.create = (req, res) => {
    const newBook = req.body; 
    Book.create(newBook)
        .then(object => {
            globalFunctions.sendResult(res, object, 201); 
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};


// Обновление существующей книги
exports.update = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body; 

    Book.update(updatedData, { where: { id: id } })
        .then(([rowsUpdate]) => {
            if (rowsUpdate === 0) {
                globalFunctions.sendError(res, { message: 'Книга не найдена или нет изменений' }, 404);
            } else {
                globalFunctions.sendResult(res, { message: 'Книга обновлена успешно' });
            }
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
    Book.destroy({ where: { id: id } })
        .then(deletedRows => {
            if (deletedRows === 0) {
                globalFunctions.sendError(res, { message: 'Книга не найдена' }, 404);
            } else {
                globalFunctions.sendResult(res, { message: 'Книга удалена успешно' });
            }
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        });
};


// Поиск книг по названию или его части
exports.findByTitle = (req, res) => {
    const title = req.query.title;  // Получаем параметр title из query-параметров

    // Если параметр title не передан, возвращаем ошибку
    if (!title) {
        return globalFunctions.sendError(res, { message: "Необходимо указать название книги для поиска." });
    }

    // Выполняем поиск книг с названием, которое частично или полностью совпадает с переданным title
    Book.findAll({
        where: {
            title: {
                [Op.like]: `%${title}%`  // Используем оператор LIKE для поиска по подстроке
            }
        }
    })
    .then(objects => {
        if (objects.length === 0) {
            return globalFunctions.sendResult(res, { message: "Книги с таким названием не найдены." });
        }
        globalFunctions.sendResult(res, objects);  // Возвращаем найденные книги
    })
    .catch(err => {
        globalFunctions.sendError(res, err);  // Обрабатываем ошибки
    });
};





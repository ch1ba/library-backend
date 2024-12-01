const { Book } = require('../models'); 
var globalFunctions = require('../config/global.functions.js');
const { Op } = require('sequelize'); 


// Получение всех книг (если есть то с сортом)

exports.findAll = (req, res) => {
    const titleFilter = req.query.title;  // Получаем параметр title из запроса
    const genreIdFilter = req.query.genreId; // Получаем параметр genreId из запроса
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

    // Создаем объект where для фильтрации
    const whereConditions = {};
    
    // Добавляем фильтрацию по заголовку, если он передан
    if (titleFilter) {
        whereConditions.title = { [Op.like]: `%${titleFilter}%` }; // Фильтрация по заголовку
    }

    // Добавляем фильтрацию по жанру, если он передан
    if (genreIdFilter) {
        whereConditions.genre_id = genreIdFilter; // Исправлено на genre_id
    }

    // Выполняем запрос на получение всех книг с фильтрацией и заданной сортировкой
    Book.findAll({
        where: whereConditions,
        order: order
    })
    .then(objects => {
        if (objects.length === 0 && (titleFilter || genreIdFilter)) {
            return globalFunctions.sendResult(res, { message: "Книги не найдены." });
        }
        globalFunctions.sendResult(res, objects);  
    })
    .catch(err => {
        globalFunctions.sendError(res, err);  
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





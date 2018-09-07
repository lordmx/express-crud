/**
 * @apiDefine Error404
 * @apiError NotFound Объект или ресурс не найдены
 *
 * @apiErrorExample Пример:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "Not Found"
 *     }
 */

/**
 * @apiDefine Error400
 * @apiError BadRequest Запрос выполнен некорректно
 *
 * @apiErrorExample Пример:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "code": 400,
 *       "message": "Bad Request"
 *     }
 */

/**
 * @apiDefine Error401
 * @apiError Unauthorized Пользователь не авторизован
 *
 * @apiErrorExample Пример:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "code": 401,
 *       "message": "Unauthorized"
 *     }
 */

/**
 * @apiDefine Error401
 * @apiError Unauthorized Пользователь не авторизован
 *
 * @apiErrorExample Пример:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "code": 401,
 *       "message": "Unauthorized"
 *     }
 */

/**
 * @apiDefine Error405
 * @apiError MethodNotAllowed Метод не разрешен
 *
 * @apiErrorExample Пример:
 *     HTTP/1.1 405 Method Not Allowed
 *     {
 *       "code": 405,
 *       "message": "Method Not Allowed"
 *     }
 */

/**
 * @apiDefine Error500
 * @apiError InternalServerError Внутренняя ошибка приложения
 *
 * @apiErrorExample Пример:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 500,
 *       "message": "Internal Server Error"
 *     }
 */
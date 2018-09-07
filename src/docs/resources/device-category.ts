/**
 * @apiDefine DeviceCategory
 * @apiSuccess (Success 2xx) {Object[]} list Список полученных категорий устройств
 * @apiSuccess (Success 2xx) {String} list.id Идентификатор категории
 * @apiSuccess (Success 2xx) {String} list.name Название
 * @apiSuccess (Success 2xx) {String} list.alias Системное название
 * @apiSuccess (Success 2xx) {Object} list.parent_id Идентификатор родительской категории
 */

/**
 * @apiDefine DeviceCategoryExample
 * @apiSuccessExample Пример:
 *     HTTP/1.1 200 OK
 *     {
 *              "list": [
 *                   {
 *                      "id": "wkfm0cgRMpUCJx0QxUtVwmKK-bMbLQgG",
 *                      "name": "IP-камера",
 *                      "alias": "camera",
 *                      "parent_id": "wkfm0cgRMpUCJx0QxUtVwmKK-bMbLQgG",
 *                   }
 *              ],
 *              "metadata": {
 *                  "total": 1,
 *                  "perPage": 1,
 *                  "pageCount": 1,
 *                  "page": 1
 *              },
 *              "error": null
 *     }
 */
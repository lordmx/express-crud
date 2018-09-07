define({ "api": [
  {
    "type": "post",
    "url": "/builds",
    "title": "Запланировать новую сборку",
    "version": "1.0.0",
    "name": "BuildsCreate",
    "group": "Builds",
    "permission": [
      {
        "name": "user"
      }
    ],
    "examples": [
      {
        "title": "Пример использования:",
        "content": "curl -i -X POST http://localhost/api/v1/builds -d '{\"project\": \"cedar\", \"branch\": \"release\"}'",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "project",
            "description": "<p>Название проекта, для которого осуществлялась сборка билда</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "branch",
            "description": "<p>Название ветки git, с которой была осуществлена сборка</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/builds.ts",
    "groupTitle": "Builds",
    "header": {
      "fields": {
        "ContentType": [
          {
            "group": "ContentType",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Тип контента</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Заголовок авторизации.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "{\n  \"Content-type\": \"application/json\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "{\n  \"Authorization\": \"Bearer 5ab4a2002b63075e4f65c853\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "type": "Object",
            "optional": false,
            "field": "metadata",
            "description": "<p>Общее Мета-данные</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.total",
            "description": "<p>Общее количество элементов</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.perPage",
            "description": "<p>Количество элементов на одной странице</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.pageCount",
            "description": "<p>Количество страни выборки</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.page",
            "description": "<p>Текущая страница</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>Список полученных сборок</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.id",
            "description": "<p>Идентификатор сборки</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.project",
            "description": "<p>Проект, для которого была осуществлена сборка</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.branch",
            "description": "<p>Название ветки git, с которой была осуществлена сборка</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.number",
            "description": "<p>Инкрементальный номер сборки внутри проекта</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.status",
            "description": "<p>Текущий статус сборки (pending - сборка запланирована, building - в процессе, completed - завершена успешно, failed - завершена с ошибкой)</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.message",
            "description": "<p>Финальное сообщение сборщика (например ошибка, с которой была завершена сборка)</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.path",
            "description": "<p>Путь до файла - результата сборки</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.created_at",
            "description": "<p>Дата добавления сборки в очередь</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.begin_building_at",
            "description": "<p>Дата начала сборки</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.complete_at",
            "description": "<p>Дата завершения сборки</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "HTTP/1.1 200 OK\n{\n     \"list\": [\n        {\n            \"id\": \"5ab4a2002b63075e4f65c853\",\n            \"number\": \"149\",\n            \"branch\": \"release\",\n            \"project\": \"test\",\n            \"status\": \"building\",\n            \"path\": null,\n            \"message\": null,\n            \"created_at\": \"2018-03-23T06:43:12.961Z\",\n            \"begin_building_at\": \"2018-03-23T06:43:12.982Z\",\n            \"completed_at\": null\n        }\n     ],\n     \"metadata\": {\n        \"total\": 1,\n        \"perPage\": 1,\n        \"pageCount\": 1,\n        \"page\": 1\n     },\n     \"error\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Запрос выполнен некорректно</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Объект или ресурс не найдены</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Пользователь не авторизован</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Внутренняя ошибка приложения</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"code\": 400,\n  \"message\": \"Bad Request\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 404,\n  \"message\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"code\": 401,\n  \"message\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 500,\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/builds",
    "title": "Получить список сформированных сборок",
    "version": "1.0.0",
    "name": "BuildsList",
    "group": "Builds",
    "permission": [
      {
        "name": "user"
      }
    ],
    "examples": [
      {
        "title": "Пример использования:",
        "content": "curl -i http://localhost/api/v1/builds?project=cedar&branch=release&page=1&sort=-id",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "project",
            "description": "<p>Название проекта, для которого осуществлялась сборка билда</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "branch",
            "description": "<p>Название ветки git, с которой была осуществлена сборка</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Перечисленный через запятую набор полей для сортировки, где префикс &quot;-&quot; - сортированать по убыванию (например: -name,id)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fields",
            "description": "<p>Перечисленный через запятую набор полей, которые будут возвращены в результирующем объекте (например: id,title)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Ограничение количества элементов в выбоке на страницу</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Номер страницы выборки</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/builds.ts",
    "groupTitle": "Builds",
    "header": {
      "fields": {
        "ContentType": [
          {
            "group": "ContentType",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Тип контента</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Заголовок авторизации.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "{\n  \"Content-type\": \"application/json\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "{\n  \"Authorization\": \"Bearer 5ab4a2002b63075e4f65c853\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "type": "Object",
            "optional": false,
            "field": "metadata",
            "description": "<p>Общее Мета-данные</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.total",
            "description": "<p>Общее количество элементов</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.perPage",
            "description": "<p>Количество элементов на одной странице</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.pageCount",
            "description": "<p>Количество страни выборки</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.page",
            "description": "<p>Текущая страница</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>Список полученных сборок</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.id",
            "description": "<p>Идентификатор сборки</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.project",
            "description": "<p>Проект, для которого была осуществлена сборка</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.branch",
            "description": "<p>Название ветки git, с которой была осуществлена сборка</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.number",
            "description": "<p>Инкрементальный номер сборки внутри проекта</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.status",
            "description": "<p>Текущий статус сборки (pending - сборка запланирована, building - в процессе, completed - завершена успешно, failed - завершена с ошибкой)</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.message",
            "description": "<p>Финальное сообщение сборщика (например ошибка, с которой была завершена сборка)</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.path",
            "description": "<p>Путь до файла - результата сборки</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.created_at",
            "description": "<p>Дата добавления сборки в очередь</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.begin_building_at",
            "description": "<p>Дата начала сборки</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.complete_at",
            "description": "<p>Дата завершения сборки</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "HTTP/1.1 200 OK\n{\n     \"list\": [\n        {\n            \"id\": \"5ab4a2002b63075e4f65c853\",\n            \"number\": \"149\",\n            \"branch\": \"release\",\n            \"project\": \"test\",\n            \"status\": \"building\",\n            \"path\": null,\n            \"message\": null,\n            \"created_at\": \"2018-03-23T06:43:12.961Z\",\n            \"begin_building_at\": \"2018-03-23T06:43:12.982Z\",\n            \"completed_at\": null\n        }\n     ],\n     \"metadata\": {\n        \"total\": 1,\n        \"perPage\": 1,\n        \"pageCount\": 1,\n        \"page\": 1\n     },\n     \"error\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Запрос выполнен некорректно</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Пользователь не авторизован</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Внутренняя ошибка приложения</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"code\": 400,\n  \"message\": \"Bad Request\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"code\": 401,\n  \"message\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 500,\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/builds/:id",
    "title": "Получить сборку по ее идентификатору",
    "version": "1.0.0",
    "name": "BuildsView",
    "group": "Builds",
    "permission": [
      {
        "name": "user"
      }
    ],
    "examples": [
      {
        "title": "Пример использования:",
        "content": "curl -i http://localhost/api/v1/builds/5ab4a2002b63075e4f65c853",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Идентификатор сборки</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fields",
            "description": "<p>Перечисленный через запятую набор полей, которые будут возвращены в результирующем объекте (например: id,title)</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/builds.ts",
    "groupTitle": "Builds",
    "header": {
      "fields": {
        "ContentType": [
          {
            "group": "ContentType",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Тип контента</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Заголовок авторизации.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "{\n  \"Content-type\": \"application/json\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "{\n  \"Authorization\": \"Bearer 5ab4a2002b63075e4f65c853\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "type": "Object",
            "optional": false,
            "field": "metadata",
            "description": "<p>Общее Мета-данные</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.total",
            "description": "<p>Общее количество элементов</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.perPage",
            "description": "<p>Количество элементов на одной странице</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.pageCount",
            "description": "<p>Количество страни выборки</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.page",
            "description": "<p>Текущая страница</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>Список полученных сборок</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.id",
            "description": "<p>Идентификатор сборки</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.project",
            "description": "<p>Проект, для которого была осуществлена сборка</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.branch",
            "description": "<p>Название ветки git, с которой была осуществлена сборка</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.number",
            "description": "<p>Инкрементальный номер сборки внутри проекта</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.status",
            "description": "<p>Текущий статус сборки (pending - сборка запланирована, building - в процессе, completed - завершена успешно, failed - завершена с ошибкой)</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.message",
            "description": "<p>Финальное сообщение сборщика (например ошибка, с которой была завершена сборка)</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.path",
            "description": "<p>Путь до файла - результата сборки</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.created_at",
            "description": "<p>Дата добавления сборки в очередь</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.begin_building_at",
            "description": "<p>Дата начала сборки</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.complete_at",
            "description": "<p>Дата завершения сборки</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "HTTP/1.1 200 OK\n{\n     \"list\": [\n        {\n            \"id\": \"5ab4a2002b63075e4f65c853\",\n            \"number\": \"149\",\n            \"branch\": \"release\",\n            \"project\": \"test\",\n            \"status\": \"building\",\n            \"path\": null,\n            \"message\": null,\n            \"created_at\": \"2018-03-23T06:43:12.961Z\",\n            \"begin_building_at\": \"2018-03-23T06:43:12.982Z\",\n            \"completed_at\": null\n        }\n     ],\n     \"metadata\": {\n        \"total\": 1,\n        \"perPage\": 1,\n        \"pageCount\": 1,\n        \"page\": 1\n     },\n     \"error\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Запрос выполнен некорректно</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Объект или ресурс не найдены</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Пользователь не авторизован</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Внутренняя ошибка приложения</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"code\": 400,\n  \"message\": \"Bad Request\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 404,\n  \"message\": \"Not Found\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"code\": 401,\n  \"message\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 500,\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/hosts",
    "title": "Получить список хостов",
    "version": "1.0.0",
    "name": "HostsList",
    "group": "Hosts",
    "permission": [
      {
        "name": "user"
      }
    ],
    "examples": [
      {
        "title": "Пример использования:",
        "content": "curl -i http://localhost/api/v1/hosts",
        "type": "json"
      }
    ],
    "filename": "src/controllers/hosts.ts",
    "groupTitle": "Hosts",
    "header": {
      "fields": {
        "ContentType": [
          {
            "group": "ContentType",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Тип контента</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Заголовок авторизации.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "{\n  \"Content-type\": \"application/json\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "{\n  \"Authorization\": \"Bearer 5ab4a2002b63075e4f65c853\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fields",
            "description": "<p>Перечисленный через запятую набор полей, которые будут возвращены в результирующем объекте (например: id,title)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Перечисленный через запятую набор полей для сортировки, где префикс &quot;-&quot; - сортированать по убыванию (например: -name,id)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Ограничение количества элементов в выбоке на страницу</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Номер страницы выборки</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "type": "Object",
            "optional": false,
            "field": "metadata",
            "description": "<p>Общее Мета-данные</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.total",
            "description": "<p>Общее количество элементов</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.perPage",
            "description": "<p>Количество элементов на одной странице</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.pageCount",
            "description": "<p>Количество страни выборки</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.page",
            "description": "<p>Текущая страница</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>Список хостов</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.id",
            "description": "<p>Идентификатор хоста</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.name",
            "description": "<p>Название хоста</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.host",
            "description": "<p>Hostname хоста</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "HTTP/1.1 200 OK\n{\n     \"list\": [\n        {\n             \"id\": \"5aaf703f74e0b92de93acffa\",\n             \"name\": \"cedar-preprod\",\n             \"host\": \"cedar-preprod.mts.ru\"\n        }\n     ],\n     \"metadata\": {\n        \"total\": 1,\n        \"perPage\": 1,\n        \"pageCount\": 1,\n        \"page\": 1\n     },\n     \"error\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Запрос выполнен некорректно</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Пользователь не авторизован</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Внутренняя ошибка приложения</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"code\": 400,\n  \"message\": \"Bad Request\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"code\": 401,\n  \"message\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 500,\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/logs",
    "title": "Получить записи лога",
    "version": "1.0.0",
    "name": "LogsList",
    "group": "Logs",
    "permission": [
      {
        "name": "user"
      }
    ],
    "examples": [
      {
        "title": "Пример использования:",
        "content": "curl -i http://localhost/api/v1/logs?entity=build&entity_id=5ab1dd44b7fc954a8e1fda0c",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "entity",
            "description": "<p>Тип действия (build - сборка, deployment - выкладка)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "entity_id",
            "description": "<p>Идентификатор действия</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fields",
            "description": "<p>Перечисленный через запятую набор полей, которые будут возвращены в результирующем объекте (например: id,title)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Перечисленный через запятую набор полей для сортировки, где префикс &quot;-&quot; - сортированать по убыванию (например: -name,id)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Ограничение количества элементов в выбоке на страницу</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Номер страницы выборки</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/logs.ts",
    "groupTitle": "Logs",
    "header": {
      "fields": {
        "ContentType": [
          {
            "group": "ContentType",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Тип контента</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Заголовок авторизации.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "{\n  \"Content-type\": \"application/json\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "{\n  \"Authorization\": \"Bearer 5ab4a2002b63075e4f65c853\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "type": "Object",
            "optional": false,
            "field": "metadata",
            "description": "<p>Общее Мета-данные</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.total",
            "description": "<p>Общее количество элементов</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.perPage",
            "description": "<p>Количество элементов на одной странице</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.pageCount",
            "description": "<p>Количество страни выборки</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.page",
            "description": "<p>Текущая страница</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>Список логов</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.id",
            "description": "<p>Идентификатор лога</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.entity",
            "description": "<p>Тип сущности (сейчас: build или deployment)</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.entity_id",
            "description": "<p>Идентификатор сущности</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.created_at",
            "description": "<p>Дата создания записи лога</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Object[]",
            "optional": false,
            "field": "list.rows",
            "description": "<p>Строки лога</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.rows.created_at",
            "description": "<p>Дата появления строки</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "list.rows.index",
            "description": "<p>Номер строки внутри лога</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.rows.message",
            "description": "<p>Текст строки лога</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.rows.type",
            "description": "<p>Тип строки (error - ошибка, info - информационное сообщение, debug - отладочная информация</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "HTTP/1.1 200 OK\n{\n     \"list\": [\n        {\n             \"id\": \"5ab3721d20478c3eceb0d6e8\",\n             \"entity\": \"build\",\n             \"entity_id\": \"5ab3721d20478c3eceb0d6e7\",\n             \"created_at\": \"2018-03-22T09:06:37.979Z\",\n             \"rows\": [\n                 {\n                     \"created_at\": \"2018-03-22T09:06:37.979Z\",\n                     \"message\": \"Building process is beginning...\",\n                     \"index\": 1,\n                     \"type\": \"info\"\n                 }\n             ],\n        }\n     ]\n     \"metadata\": {\n        \"total\": 1,\n        \"perPage\": 1,\n        \"pageCount\": 1,\n        \"page\": 1\n     },\n     \"error\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Запрос выполнен некорректно</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Пользователь не авторизован</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Внутренняя ошибка приложения</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"code\": 400,\n  \"message\": \"Bad Request\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"code\": 401,\n  \"message\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 500,\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/statistic",
    "title": "Получить статистику по действию",
    "version": "1.0.0",
    "name": "StatisticList",
    "group": "Statistic",
    "permission": [
      {
        "name": "user"
      }
    ],
    "examples": [
      {
        "title": "Пример использования:",
        "content": "curl -i http://localhost/api/v1/statistic?type=build&project=cedar",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "project",
            "description": "<p>Название проекта (например: cedar)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Тип действия (build - сборка, deployment - выкладка)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fields",
            "description": "<p>Перечисленный через запятую набор полей, которые будут возвращены в результирующем объекте (например: id,title)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sort",
            "description": "<p>Перечисленный через запятую набор полей для сортировки, где префикс &quot;-&quot; - сортированать по убыванию (например: -name,id)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Ограничение количества элементов в выбоке на страницу</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>Номер страницы выборки</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/statistic.ts",
    "groupTitle": "Statistic",
    "header": {
      "fields": {
        "ContentType": [
          {
            "group": "ContentType",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>Тип контента</p>"
          }
        ],
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Заголовок авторизации.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "{\n  \"Content-type\": \"application/json\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "{\n  \"Authorization\": \"Bearer 5ab4a2002b63075e4f65c853\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "type": "Object",
            "optional": false,
            "field": "metadata",
            "description": "<p>Общее Мета-данные</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.total",
            "description": "<p>Общее количество элементов</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.perPage",
            "description": "<p>Количество элементов на одной странице</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.pageCount",
            "description": "<p>Количество страни выборки</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "metadata.page",
            "description": "<p>Текущая страница</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Object[]",
            "optional": false,
            "field": "list",
            "description": "<p>Список статистики</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.id",
            "description": "<p>Идентификатор записи</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.type",
            "description": "<p>Тип сущности, по которой собирается статистика (сейчас: build или deployment)</p>"
          },
          {
            "group": "Success 2xx",
            "type": "String",
            "optional": false,
            "field": "list.project",
            "description": "<p>Название проекта (например: cedar)</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "list.total",
            "description": "<p>Всего действий (сборок или деплоев)</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "list.completed",
            "description": "<p>Всего успешных действий</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "list.failed",
            "description": "<p>Всего неуспешных действий</p>"
          },
          {
            "group": "Success 2xx",
            "type": "Number",
            "optional": false,
            "field": "list.average_duration",
            "description": "<p>Средняя длительность</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "HTTP/1.1 200 OK\n{\n     \"list\": [\n        {\n             \"id\": \"5ab1dd44b7fc954a8e1fda0c\",\n             \"type\": \"build\",\n             \"project\": \"test\",\n             \"total\": 80,\n             \"completed\": 76,\n             \"failed\": 4,\n             \"average_duration\": 12241\n        }\n     ],\n     \"metadata\": {\n        \"total\": 1,\n        \"perPage\": 1,\n        \"pageCount\": 1,\n        \"page\": 1\n     },\n     \"error\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Запрос выполнен некорректно</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Пользователь не авторизован</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Внутренняя ошибка приложения</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Пример:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"code\": 400,\n  \"message\": \"Bad Request\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"code\": 401,\n  \"message\": \"Unauthorized\"\n}",
          "type": "json"
        },
        {
          "title": "Пример:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 500,\n  \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });

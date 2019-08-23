import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    order_no: '@guid()',
    timestamp: +Mock.Random.date('T'),
    username: '@name()',
    price: '@float(1000, 15000, 0, 2)',
    'status|1': ['success', 'pending']
  }))
}

export default {
  getList: () => {
    return {
        "flag": "0000",
        "msg": "",
        "result": {
            total: List.length,
            items: List
        }
    }
    // {
    //   total: List.length,
    //   items: List
    // }
  }
}

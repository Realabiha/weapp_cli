/*
  若干个任务在最短时间内执行并且结果按顺序输出
  for + promise + reduce
*/

const tasks = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
// const promises = tasks.map(task => new Promise(resolve => {
//   const delay = Math.random() * 1000 + 100
//   setTimeout(_ => {resolve(task); console.log(task, 'async')}, delay)
// }))

// const parallelPromise = promises.reduce(
//   (prev, next) => prev.then(_ => next.then(data => {console.log(data, 'data'); return data}), 
//     Promise.resolve()
//   )
// )

// parallelPromise.then(_ => console.log('done')).catch(err => console.log(err))

function promisify(fn) {
  return function (config = {}) {
    return new Promise((resolve, reject) => {
      config.success = (data) => resolve(data)
      config.fail = (err) => reject(err)
      // fn(config)
      const delay = Math.random() * 1000
      setTimeout(() => {
        console.log(fn)
        resolve(fn)
      }, delay)
    })
  }
}


/*

*/

function limitParallel(limit = 3){
  const sequence = tasks.slice(0)
  const promises = sequence.splice(0, limit).map((task, index) => {
    // ...
    promisify(task)().then(_ => {console.log(_, '='); return index})
  })

  let p = Promise.race(promises)

  for(let i = 0; i < sequence.length; i++){
    p = p.then(index => {
      promises[index] = promisify(sequence[i])().then(() => {
        return index
      })
      return Promise.race(promises)
    })
  }
}



limitParallel()


function limitPromiseParallel(
  limit = 5, 
  callback = _ => console.log(_, 'finally')
){
  Promise.all(
    // async函数本身会返回promise对象
    Array.from({length: limit}).map(async (_) => {
      // return new Promise(async (resolve) => {
      // const runTask = async () => {
      //   if(tasks.length <= 0) return resolve()
      //   await promisify(tasks.shift())()
      //   runTask()
      // }
      // runTask()
      while(tasks.length){
        await promisify(tasks.shift())()
      }
      // resolve()
      // })
    })
  ).finally(callback)
}

limitPromiseParallel()

// export {}

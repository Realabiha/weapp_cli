const tasks = [1,2,3,4,5]
const promises = tasks.map(task => new Promise(resolve => {
  const delay = Math.random() * 1000 + 100
  setTimeout(_ => {resolve(task); console.log(task, 'async')}, delay)
}))

const parallelPromise = promises.reduce(
  (prev, next) => prev.then(_ => next.then(data => {console.log(data, 'data'); return data}), 
    Promise.resolve()
  )
)


parallelPromise.then(_ => console.log('done')).catch(err => console.log(err))


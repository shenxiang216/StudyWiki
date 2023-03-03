/*
 * @Author: Deep Lane
 * @Date: 2022-03-09 21:44:48
 * @LastEditors: Deep Lane
 * @LastEditTime: 2022-03-17 21:29:23
 * @Description:
 */
const path = require("path")
const fs = require("fs")
// 获取目录
// 数据结构：[{name:"...",list:[a.md,b.md]}]
let components = []
const files = fs.readdirSync("./")
files.forEach(function (item, index) {
  let stat = fs.lstatSync("./" + item)
  if (stat.isDirectory() === true && item != ".git") {
    components.push({ name: item, list: [] })
  }
})

let walk = function (dir) {
  let results = []
  let list = fs.readdirSync(dir)
  list.forEach(function (file) {
    let count = 1
    // 排除静态目录（可按你需求进行新增）
    if (file === "node_modules") {
      return false
    }
    file = dir + "/" + file

    let stat = fs.statSync(file)
    if (stat && stat.isDirectory()) {
      if (count == 2) {
        return
      }
      count++
      results = results.concat(walk(file))
    } else {
      // 过滤后缀名（可按你需求进行新增）
      if (path.extname(file) === ".md") {
        components.forEach((item) => {
          // console.log(path.resolve(__dirname, file).toString().split("\\").slice(-2,-1))
          if (
            path
              .resolve(__dirname, file)
              .toString()
              .split("\\")
              .slice(-2, -1)[0]
              .search(item.name) != -1
          ) {
            item.list.push(path.basename(file))
          }
        })
        // console.log(path.basename(file))

        results.push(path.resolve(__dirname, file))
      }
    }
  })
  return results
}

walk("./")
console.log(components)
let content = ""
components.forEach((item) => {
  content += `- :cupid:${item.name}\n`
  item.list.forEach((file) => {
    content += `   - [${file.replace('.md','')}](${item.name.replace(
      /\s/g,
      "%20"
    )}/${file.replace(/\s/g, "%20")})\n`
  })
})
console.log(content)
fs.writeFile("./_sidebar.md", content, (err) => {
  if (err) {
    console.error(err)
    return
  }
})
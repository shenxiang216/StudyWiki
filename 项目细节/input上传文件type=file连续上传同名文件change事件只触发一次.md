## 解决input上传文件type=file连续上传同名文件change事件只触发一次

## bug背景：vue3，ts

## 部分代码

```javascript
 <!-- 隐藏的input file -->
    <input
      type="file"
      @input="uploadFile"
      ref="fileInput"
      style="display: none"
    />
      <div class="file" @click="clickUpload">上传文件</div>

 const fileInput = ref<HTMLInputElement | null>(null)
    const clickUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const uploadFile = async (e: Event) => {
      if (!CountStorage(new Date())) {
        Toast.fail("单日上传下载限制为10次,明日再试吧！")
        return
      }
      // 断言为HTMLInputElement
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        Toast.loading({
          message: "上传中...",
          forbidClick: true,
        })
        const uploadedFile = files[0]
        const formData = new FormData()
        formData.append("file", uploadedFile)
        try {
          const res = await upload(formData)
          if (res.stat === "OK") {
            showkey.value = true
            Toast.clear()
            Toast.success("上传成功")
            // 清空input
            target.value = ""
            return
          }
          Toast.fail("网络错误")
          // 清空input
          target.value = ""
          return
        } catch {
          Toast.clear()
          Toast.fail("上传失败")
          // 清空input
          target.value = ""
        }
      }
    }
```

## bug分析与解决：

* 原生的input file太难看了，只能通过隐藏input，点击按钮触发input的click事件`(clickUpload)`进入文件选择，然后input监听change事件`(uploadFile)`。
* 问题在于，如果用户多次上传了相同的文件，`uploadFile`只会执行一次，所以需要通过`target.value = ""`置空input



import EnterPanel from "@/components/enter/EnterPanel"

export default function Index() {

  return <div className="w-full">
    <h1 className="hidden">Enter Page</h1>
    <div className="grid md:grid-cols-2 gap-5 p-3 items-center">

      <div className="grid gap-3">
        <p>欢迎！本站无需注册,无需付费,你可以在线阅读 Giant_A 的书籍。请先选择头像,再输入任意昵称,书籍加载完毕后,点击“前往书籍页面”,即可前往阅读书籍。</p>
        <p>如果书籍加载时长超过一分钟，可尝试刷新本页面。</p>
        <p className="text-red-600 font-bold">        本站书籍或含有成人内容描写,未满18岁,或未达到当地法定成人年龄的未成年人禁止阅读。</p>
        <p>Giant_A,曾用名 Big_A, 前ht作者,作品有《曹将军》,《长珠》,《整整齐齐一家人》,《暗情》,《收网》,《圣子伊登》等,涉猎BL,GL,BG,原创以及同人。</p>
        <p>本站将会收录,并分享作者 Giant_A 的书籍更新以及动态。Giant_A 的书籍和个人观点不代表本站立场。本站有权删除或屏蔽不当内容。</p>
        <p>请勿转载,请勿二次上传 Giant_A 的书籍作品。</p>

      </div>
      <EnterPanel />


    </div>
  </div>
}



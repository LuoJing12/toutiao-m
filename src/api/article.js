import request from '../utils/request.js'

export function getArticleList (params) {
  return request({
    url: '/v1_0/articles',
    method: 'get',
    params
  })
}

export function getArticleDetail (id) {
  //! 图片加载出错,第一种解决可以把数据写死
  if (id === '8114') {
    return new Promise((resolve, reject) => {
      resolve({
        data: { data: { art_id: '8114', title: '利用jmap和MAT等工具查看JVM运行时堆内存', pubdate: '2019-03-11 09:00:00', aut_id: '1111', content: "<p><span style=\"font-size: 18pt; font-family: 'Microsoft YaHei'; color: #df4998;\">jmap</span></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">JDK自带了一些工具可以帮助我们查看JVM运行的堆内存情况，常用的是<strong>jmap</strong>命令</span></p>&#13;\n<p><img src=\"https://images2018.cnblogs.com/blog/874963/201808/874963-20180830161107932-722610954.png\" alt=\"\" /></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">jmap -heap &lt;pid&gt;　　打印堆的使用情况</span></p>&#13;\n<p><img src=\"https://images2018.cnblogs.com/blog/874963/201808/874963-20180830161259670-1917091152.png\" alt=\"\" /></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">那么，从这个输出中我们也可以大致看出堆的结构，分为Young Generation （年轻代） 和 Old Generation （老年代）</span></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">Young Generation又被划分为：Eden Space ， From Space 和 To Space</span></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">可以看到这里To区是干净的，还未被使用，From区已经使用了95%了</span></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">jmap -histo[:live] &lt;pid&gt;　　打印类的实例数量、占用的内存、类的名称，通常我们并不需要看所有的，只需要看前几条即可</span></p>&#13;\n<p><img src=\"https://images2018.cnblogs.com/blog/874963/201808/874963-20180830162757939-575176272.png\" alt=\"\" /></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">jmap -dump:live,format=b,file=heap.bin &lt;pid&gt;　　</span></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">以hprof二进制格式dump堆的使用情况（PS：相当于生成一个快照，后续我们可以对这个快照文件进行分析）</span></p>&#13;\n<p><img src=\"https://images2018.cnblogs.com/blog/874963/201808/874963-20180830163420274-1709483353.png\" alt=\"\" /></p>&#13;\n<p><span style=\"font-size: 18pt; color: #df4998;\">Memory Analyzer (MAT)</span></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">文件dump下来以后，可以使用Eclipse的MAT插件进行查看</span></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">如果日常开发用的是eclipse的话，可以直接安装这个插件，如果不是的话，这个插件也可以独立运行</span></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\"><a href=\"https://www.eclipse.org/mat/\" target=\"_blank\">https://www.eclipse.org/mat/</a></span></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\"><a href=\"https://www.eclipse.org/mat/downloads.php\" target=\"_blank\">https://www.eclipse.org/mat/downloads.php</a></span></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">解压之后双击MemoryAnalyzer.exe即可运行</span></p>&#13;\n<p><img src=\"https://images2018.cnblogs.com/blog/874963/201808/874963-20180830164047157-1657211213.png\" alt=\"\" /></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">打开刚才的heap.bin文件</span></p>&#13;\n<p><img src=\"https://images2018.cnblogs.com/blog/874963/201808/874963-20180830164252096-1116314438.png\" alt=\"\" /></p>&#13;\n<p><img src=\"https://images2018.cnblogs.com/blog/874963/201808/874963-20180830164332465-1304027200.png\" alt=\"\" /></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">可以看到下面有三个选项卡，包括可以执行的操作和报表</span></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">先看第一个<strong>Histogram</strong></span></p>&#13;\n<p><img src=\"https://images2018.cnblogs.com/blog/874963/201808/874963-20180830164631633-1733215997.png\" alt=\"\" /></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">由于这里是随便运行的一个工程，并没有出现内存泄漏之类的问题，所以这里看到的都是一些基础的java类</span></p>&#13;\n<p><strong><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">查看引用</span></strong></p>&#13;\n<p><img src=\"https://images2018.cnblogs.com/blog/874963/201808/874963-20180830164912757-994940077.png\" alt=\"\" /></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\"><strong>Dominator Tree</strong> 可以看到biggest object以及它们所占内存的比例</span></p>&#13;\n<p><img src=\"https://images2018.cnblogs.com/blog/874963/201808/874963-20180830165127054-2121722725.png\" alt=\"\" /></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">我们一级一级的找，可以找到源文件，然后分析代码，最终定位到问题之根源</span></p>&#13;\n<p><span style=\"font-size: 18pt; font-family: 'Microsoft YaHei'; color: #df4998;\">jconsole</span></p>&#13;\n<p><span style=\"font-family: 'Microsoft YaHei'; font-size: 18px;\">可以查看本地的进程，也可以查看远程主机上的进程</span></p>&#13;\n<p><img src=\"https://images2018.cnblogs.com/blog/874963/201808/874963-20180830170223337-733059807.png\" alt=\"\" /></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">例如：jconsole 192.168.102.16:9105</span></p>&#13;\n<p><img src=\"https://images2018.cnblogs.com/blog/874963/201808/874963-20180830170310794-1870938472.png\" alt=\"\" /></p>&#13;\n<p><img src=\"https://images2018.cnblogs.com/blog/874963/201808/874963-20180830170439172-187863062.png\" alt=\"\" /></p>&#13;\n<p><span style=\"font-size: 18px; font-family: 'Microsoft YaHei';\">或者本地</span></p>&#13;\n<p><img src=\"https://images2018.cnblogs.com/blog/874963/201808/874963-20180830170449719-421128500.gif\" alt=\"\" /></p>&#13;\n<p><span style=\"font-size: 18pt; color: #df4998; font-family: 'Microsoft YaHei';\">其它</span></p>&#13;\n<p><img src=\"https://images2018.cnblogs.com/blog/874963/201808/874963-20180830170755595-320946629.png\" alt=\"\" /></p>&#13;\n<p><span style=\"font-size: 18pt; color: #df4998; font-family: 'Microsoft YaHei';\">参考</span></p>&#13;\n<p><span style=\"font-size: 16px; font-family: 'Microsoft YaHei';\"><a href=\"https://blog.csdn.net/xiaojia1100/article/details/78675960\" target=\"_blank\">https://blog.csdn.net/xiaojia1100/article/details/78675960</a></span></p>&#13;\n<p><span style=\"font-size: 16px; font-family: 'Microsoft YaHei';\"><a href=\"https://www.cnblogs.com/kongzhongqijing/articles/3621163.html\" target=\"_blank\">https://www.cnblogs.com/kongzhongqijing/articles/3621163.html</a></span></p>&#13;\n<p><span style=\"font-size: 16px; font-family: 'Microsoft YaHei';\"><a href=\"https://blog.csdn.net/alli0968/article/details/52460008\" target=\"_blank\">https://blog.csdn.net/alli0968/article/details/52460008</a></span></p>&#13;\n<p><span style=\"font-size: 16px; font-family: 'Microsoft YaHei';\"><a href=\"https://blog.csdn.net/u011512180/article/details/51874097\" target=\"_blank\">https://blog.csdn.net/u011512180/article/details/51874097</a></span></p>&#13;\n<p> </p>", aut_name: '黑马先锋', aut_photo: 'http://toutiao.itheima.net/images/user_head.jpg', is_followed: false, is_collected: false, attitude: -1, comm_count: 1, read_count: 244, like_count: 0 }, message: 'OK' }
      })
    })
  } else {
    return request({
      url: '/v1_0/articles/' + id,
      method: 'get'
    })
  }
  //! 图片加载出错,第二种解决可以设置 <meta name="referrer" content="no-referrer" />
}

/**
 * 收藏文章
 */
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 */
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

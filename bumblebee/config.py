class ConfigError(Exception):

    def __init__(self, msg):
        print(msg)


class Headers():
    # TODO random header items & newest Chrome version
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) \
            AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 \
            Safari/537.36', }


class Zhihu(Headers):

    cookies_file = 'cookies/zhihu.json'
    cookies_domain = '.zhihu.com'
    root = 'https://www.zhihu.com'
    # get this by get self info
    # url_token = 'self_url_token'
    endpoints = {}

    def build(self, cookies_file):

        self.headers['referer'] = {
            'referer': f'{self.root}/people/{self.url_token}'}

        self.endpoints['postPins'] = f'{self.root}/api/v4/pins'
        self.endpoints['getFolloweeList'] = f'{self.root}/api/v4/members/\
                                       {self.url_token}/followees'
        self.endpoints['grabRecFeed'] = f'{self.root}/api/v3/feed/topstory\
                                        /recommend'


class Bilibili(Headers):

    cookies_file = 'cookies/bilibili.json'
    cookies_domain = '.bilibili.com'
    member = 'https://member.bilibili.com/'
    default_dir = '~/bilibee/cchan'

    preupload_params = {'os': 'bos',
                        'bucket': 'bvcupcdnbosxg',
                        'r': 'bos',
                        'profile': 'ugcupos/fetch',
                        'ssl': 0}

    def __init__(self):

        self.headers['referer'] = f'{self.member}video/upload.html'
        self.headers['x-requested-with'] = 'XMLHttpRequest'

        self.endpoints = {}
        self.endpoints['preupload'] = f'{self.member}/preupload'
        self.endpoints['preAdd'] = f'{self.member}/x/geetest/pre/add'
        self.endpoints['add'] = f'{self.member}/x/vu/web/add'
        self.endpoints['postPO'] = 'https://upos-hz-upcdnws.acgvideo.com/ugc/'


class Instagram(Headers):
    cookies_file = ''
    cookies_domain = ''
    root = ''

import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
      const initialProps = await Document.getInitialProps(ctx)
  
      return initialProps
    }
  
    render() {
      return (
          <Html>
              <Head>
                    <link href="/static/assets/vendors/css/remixicon.css" rel="stylesheet"/>
                    <link href="/static/assets/vendors/css/quill.snow.css" rel="stylesheet"/>
                    <link href="/static/assets/vendors/css/quill.bubble.css" rel="stylesheet"/>
                    <link href="/static/assets/vendors/css/style-database.css" rel="stylesheet"/>
                    <link href="/static/assets/css/bootstrap-icons.css" rel="stylesheet" />
                    <link href="/static/assets/css/fontawesome.css" rel="stylesheet"/>
                    <link href="/static/assets/css/style.css" rel="stylesheet" />

                    <script src="/static/assets/js/jquery.min.js"></script>
                    <script src="/static/assets/js/bootstrap.bundle.min.js"></script>
                    <script src="/static/assets/vendors/js/quill.min.js"></script>
                    <script src="/static/assets/vendors/js/tinymce.min.js"></script>
                    <script src="/static/assets/vendors/js/simple-datatables.js"></script>
                    <script src="/static/assets/vendors/js/chart.min.js"></script>
                    <script src="/static/assets/vendors/js/apexcharts.min.js"></script>
                    <script src="/static/assets/vendors/js/echarts.min.js"></script>
                    <script src="/static/assets/js/home.js"></script>
              </Head>
              <body>
                <div className="wrapper">
                    <Main />
                </div>
                <NextScript />
              </body>
          </Html>
      );
  }
  }
  
  export default MyDocument
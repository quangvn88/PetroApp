import * as React from 'react';
import {View, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import {Asset, FileSystem} from 'react-native-unimodules';

// const myModules = {
//   highcharts: require('../highcharts-files/highcharts.hcscript'),
//   'highcharts-more': require('../highcharts-files/highcharts-more.hcscript'),
//   'highcharts-3d': require('../highcharts-files/highcharts-3d.hcscript'),
// };

const win = Dimensions.get('window');
// const path =
//   FileSystem.documentDirectory + 'dist/highcharts-files/highcharts.js';
const stringifiedScripts = {
  // highcharts:123,
  // highcharts-more:123
};

const getAssetAsString = async (asset) => {
  const downloadedModules = await FileSystem.readDirectoryAsync(
    FileSystem.cacheDirectory,
  );
  let fileName = 'ExponentAsset-' + asset.hash + '.' + asset.type;

  if (!downloadedModules.includes(fileName)) {
    await asset.downloadAsync();
  }

  return await FileSystem.readAsStringAsync(
    FileSystem.cacheDirectory + fileName,
  );
};

const serialize = (chartOptions, isUpdate) => {
  var hcFunctions = {},
    serializedOptions,
    i = 0;

  serializedOptions = JSON.stringify(chartOptions, function (val, key) {
    var fcId = '###HighchartsFunction' + i + '###';

    // set reference to function for the later replacement
    if (typeof key === 'function') {
      hcFunctions[fcId] = key.toString();
      i++;
      return isUpdate ? key.toString() : fcId;
    }

    return key;
  });

  // replace ids with functions.
  if (!isUpdate) {
    Object.keys(hcFunctions).forEach(function (key) {
      serializedOptions = serializedOptions.replace(
        '"' + key + '"',
        hcFunctions[key],
      );
    });
  }

  return serializedOptions;
};
const stringScript = {};
const addScript = async (name) => {
  // const script = Asset.fromModule(myModules[name]);
  // stringifiedScripts[name] = await myModules[name];
  // switch (name) {
  //   case 'highcharts':
  //     stringScript[name] = require('../highcharts-files/highcharts.hcscript');
  //     break;
  //   case 'highcharts-more':
  //     stringScript[name] = require('../highcharts-files/highcharts.hcscript');
  //     break;
  //   case 'highcharts-3d':
  //     stringScript[name] = require('../highcharts-files/highcharts.hcscript');
  //     break;
  // }
};

const path = './';

export default function MyHighCharts(props) {
  const [hcModulesReady, showReady] = React.useState(false);
  const [runFirst, updateRunFirst] = React.useState('');
  const setHcAssets = async () => {
    // await addScript('highcharts');
    // await addScript('highcharts-more');
    // await addScript('highcharts-3d');
    const scriptsPath = path;
    // console.log(stringScript);
    updateRunFirst(`
           window.data = \"${props.data ? props.data : null}\";
           var modulesList = ${JSON.stringify([])};

           if (modulesList.length > 0) {
              modulesList = modulesList.split(',');
           }

           function loadScripts(file, callback, redraw, isModule) {

              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    
                    var hcScript = document.createElement('script');
                    hcScript.innerHTML = this.responseText;
                    document.body.appendChild(hcScript);

                    if (callback) {
                        callback.call();
                    }

                    if (redraw) {
                        Highcharts.setOptions('${serialize({})}');

                        Highcharts.chart("container", ${serialize(
                          props.options,
                        )});
                    }
                }
              };
              // xhttp.open("GET", '${scriptsPath}' + (isModule ? 'modules/' + file : file) + '.js', true);
              // xhttp.send();
            }

            loadScripts('highcharts', function () {

                var redraw = modulesList.length > 0 ? false : true;

                loadScripts('highcharts-more', function () {
                    if (modulesList.length > 0) {
                        for (var i = 0; i < modulesList.length; i++) {
                            if (i === (modulesList.length - 1)) {
                                redraw = true;
                            } else {
                                redraw = false;
                            }
                            loadScripts(modulesList[i], undefined, redraw, true);
                        }
                    }
                }, redraw);
            }, false);
        `);
    //   updateRunFirst(`
    //   window.data = \"${props.data ? props.data : null}\";
    //   var modulesList = ${JSON.stringify([])};
    //   var readable = ${JSON.stringify(stringScript)}

    //   function loadScripts(file, callback, redraw) {
    //       var hcScript = document.createElement('script');
    //       hcScript.innerHTML = readable[file]
    //       document.body.appendChild(hcScript);

    //       if (callback) {
    //           callback.call();
    //       }

    //       if (redraw) {
    //           Highcharts.setOptions('${serialize({})}');
    //           Highcharts.chart("container", ${serialize(props.options)});
    //       }
    //   }

    //   loadScripts('highcharts', function () {
    //       var redraw = modulesList.length > 0 ? false : true;
    //       loadScripts('highcharts-more', function () {
    //           if (modulesList.length > 0) {
    //               for (var i = 0; i < modulesList.length; i++) {
    //                   if (i === (modulesList.length - 1)) {
    //                       redraw = true;
    //                   } else {
    //                       redraw = false;
    //                   }
    //                   loadScripts(modulesList[i], undefined, redraw, true);
    //               }
    //           }
    //       }, redraw);
    //   }, false);
    // `);
    showReady(true);
  };
  var webviewRef = null;
  React.useEffect(() => {
    webviewRef && webviewRef.postMessage(serialize(props.options, true));
    const getAsset = async () => {
      await setHcAssets();
    };
    getAsset();
  });
  return hcModulesReady ? (
    <View style={[props.styles, {width: win.width, height: win.height}]}>
      <WebView
        ref={(ref) => {
          webviewRef = ref;
        }}
        onMessage={
          props.onMessage
            ? (event) => props.onMessage(event.nativeEvent.data)
            : () => {}
        }
        source={{html: props.layoutHtml}}
        injectedJavaScript={runFirst}
        originWhitelist={['*']}
        automaticallyAdjustContentInsets={true}
        allowFileAccess={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        useWebKit={true}
        scrollEnabled={false}
        mixedContentMode="always"
        allowFileAccessFromFileURLs={true}
        startInLoadingState={true}
      />
    </View>
  ) : (
    <View></View>
  );
}

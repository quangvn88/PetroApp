import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import * as Progress from 'react-native-progress';
// import RNRestart from 'react-native-restart';
import {CodePush} from '../../utils';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ModalUpdating = () => {
  const [progress, updateProgress] = React.useState({
    progress: 0,
    status: '',
  });
  const onSyncStatusChange = function (SyncStatus) {
    switch (SyncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        updateProgress({...progress, status: 'Đang kiểm tra bản cập nhật...'});
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        updateProgress({...progress, status: 'Đang tải bản cập nhật...'});
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        updateProgress({...progress, progress: 1, status: 'Đang cài đặt...'});
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        updateProgress({
          ...progress,
          status: 'Ứng dụng đã ở phiên bản mới nhất.',
        });
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        updateProgress({...progress, status: 'Cập nhật đã bị hủy.'});
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        updateProgress({
          ...progress,
          progress: 1,
          status: 'Cập nhật thành công, khởi động lại ứng dụng.',
        });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        updateProgress({
          ...progress,
          status: 'Có lỗi xảy ra vui lòng thử lại.',
        });
        break;
    }
  };
  const onDownloadProgress = function (downloadProgress) {
    if (downloadProgress) {
      updateProgress({
        ...progress,
        progress: downloadProgress.receivedBytes / downloadProgress.totalBytes,
      });
    }
  };
  const onError = function (error) {
    updateProgress({...progress, status: 'Có lỗi xảy ra vui lòng thử lại.'});
  };
  React.useEffect(() => {
    // Không tự động restart
    CodePush.disallowRestart();
    // Kiểm tra update và thông báo cài đặt
    CodePush.sync(
      {
        updateDialog: updateDialogOptions,
        installMode: CodePush.InstallMode.ON_NEXT_RESTART,
      },
      onSyncStatusChange,
      onDownloadProgress,
      onError,
    );
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>{progress.status}</Text>
        <View style={{marginVertical: 10}}>
          <Progress.Bar
            progress={progress.progress}
            width={(screenWidth * 8) / 10}
          />
        </View>
        {progress.status === 'Có lỗi xảy ra vui lòng thử lại.' ||
        progress.status === 'Cập nhật đã bị hủy.' ? (
          <TouchableOpacity
            style={styles.btnUpdate}
            onPress={() => {
              CodePush.sync(
                {
                  updateDialog: updateDialogOptions,
                  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
                },
                onSyncStatusChange,
                onDownloadProgress,
                onError,
              );
            }}>
            <Text style={styles.text}>Kiểm tra bản cập nhật</Text>
          </TouchableOpacity>
        ) : null}
        {progress.status === 'Cập nhật thành công, khởi động lại ứng dụng.' ? (
          <TouchableOpacity
            style={styles.btnUpdate}
            onPress={() => {
              // RNRestart.Restart();
              //   setTimeout(() => {
              CodePush.allowRestart();
              CodePush.restartApp();
              // }, 300);
            }}>
            <Text style={styles.text}>Khởi động lại</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default ModalUpdating;

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    lineHeight: 28,
    color: '#fff',
  },
  btnUpdate: {
    backgroundColor: '#009cdf',
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

const updateDialogOptions = {
  title: 'Ứng dụng có một bản cập nhật',
  optionalUpdateMessage: 'Cập nhật ngay?',
  optionalIgnoreButtonLabel: 'Hủy bỏ',
  optionalInstallButtonLabel: 'Đồng ý',
  mandatoryUpdateMessage: 'Cập nhật phiên bản mới nhất để tiếp tục',
  mandatoryContinueButtonLabel: 'Cập nhật',
};

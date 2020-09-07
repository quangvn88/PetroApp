import * as React from 'react';
import Authentication from './src/components/auth';
// import CodePush from 'react-native-code-push';
import { CodePush } from './src/utils';

function App() {
    return (
        <Authentication />
    );
};

const CodePushOptions = {
    checkFrequency: CodePush.CheckFrequency.MANUAL
};

export default CodePush(CodePushOptions)(App);
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApCopyHgrfAf4HT2S8wEApjDvNZZ57Srw",
    projectId: "minskin-test",
    storageBucket: "minskin-test.appspot.com",
    messagingSenderId: "917259993938",
    appId: "1:917259993938:ios:3ca9a310bb26a8e0d6708b",
    databaseURL: "https://minskin-test-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
let app;
let database;
let auth;

async function initializeFirebase() {
    try {
        // 初始化 Firebase
        app = firebase.initializeApp(firebaseConfig);
        database = firebase.database();
        auth = firebase.auth();

        // 使用匿名认证
        await auth.signInAnonymously();
        
        console.log("Firebase initialized successfully");
        return true;
    } catch (error) {
        console.error("Error initializing Firebase:", error);
        return false;
    }
}

// 立即初始化 Firebase
initializeFirebase().then(success => {
    if (!success) {
        console.error("Failed to initialize Firebase");
    }
});

// 检查数据库连接状态
function checkDatabaseConnection() {
    return new Promise((resolve, reject) => {
        if (!database) {
            reject(new Error("数据库未初始化，请刷新页面重试"));
            return;
        }

        if (!auth.currentUser) {
            reject(new Error("未登录，请刷新页面重试"));
            return;
        }

        const connectedRef = database.ref(".info/connected");
        const timeoutId = setTimeout(() => {
            connectedRef.off("value");
            reject(new Error("连接超时，请检查网络后重试"));
        }, 5000);

        connectedRef.on("value", (snap) => {
            clearTimeout(timeoutId);
            connectedRef.off("value");
            
            if (snap.val() === true) {
                resolve(true);
            } else {
                reject(new Error("无法连接到数据库，请检查网络连接"));
            }
        });
    });
}

// 检查数据库访问是否过期
function checkDatabaseAccess() {
    const expirationDate = 1744786800000; // 2025-4-16
    return Date.now() < expirationDate;
}

// 获取统计数据
async function getStatistics() {
    try {
        // 检查数据库连接
        await checkDatabaseConnection();

        if (!checkDatabaseAccess()) {
            throw new Error("数据库访问已过期");
        }

        const snapshot = await database.ref('statistics').get();
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            // 如果没有数据，返回初始数据
            const initialData = {
                normal: 0,
                dry: 0,
                oily: 0,
                combination: 0,
                sensitive: 0,
                totalTests: 0,
                lastUpdated: Date.now()
            };
            // 保存初始数据到数据库
            await database.ref('statistics').set(initialData);
            return initialData;
        }
    } catch (error) {
        console.error("获取统计数据时出错:", error);
        return {
            error: error.message
        };
    }
}

// 更新统计数据
async function updateStatistics(skinType) {
    try {
        // 检查数据库连接
        await checkDatabaseConnection();

        if (!checkDatabaseAccess()) {
            throw new Error("数据库访问已过期");
        }

        // 获取当前统计数据的引用
        const statsRef = database.ref('statistics');
        
        // 使用事务来确保数据一致性
        return await statsRef.transaction((currentStats) => {
            if (currentStats === null) {
                // 如果没有数据，创建初始数据
                return {
                    normal: skinType === 'normal' ? 1 : 0,
                    dry: skinType === 'dry' ? 1 : 0,
                    oily: skinType === 'oily' ? 1 : 0,
                    combination: skinType === 'combination' ? 1 : 0,
                    sensitive: skinType === 'sensitive' ? 1 : 0,
                    totalTests: 1,
                    lastUpdated: Date.now()
                };
            }

            // 更新现有数据
            currentStats[skinType] = (currentStats[skinType] || 0) + 1;
            currentStats.totalTests = (currentStats.totalTests || 0) + 1;
            currentStats.lastUpdated = Date.now();
            return currentStats;
        });
    } catch (error) {
        console.error("更新统计数据时出错:", error);
        return {
            error: error.message
        };
    }
}

// 格式化日期显示
function formatDate(timestamp) {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
} 
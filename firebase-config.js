// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApCopyHgrfAf4HT2S8wEApjDvNZZ57Srw",
    authDomain: "minskin-test.firebaseapp.com",
    projectId: "minskin-test",
    storageBucket: "minskin-test.appspot.com",
    messagingSenderId: "917259993938",
    appId: "1:917259993938:web:3ca9a310bb26a8e0d6708b",
    databaseURL: "https://minskin-test-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
let app;
let database;
let auth;

async function initializeFirebase() {
    try {
        if (!app) {
            app = firebase.initializeApp(firebaseConfig);
            database = firebase.database();
            auth = firebase.auth();

            // Use anonymous authentication
            await auth.signInAnonymously();
            console.log("Firebase initialized successfully");
        }
        return true;
    } catch (error) {
        console.error("Error initializing Firebase:", error);
        return false;
    }
}

// Initialize Firebase immediately
initializeFirebase().then(success => {
    if (!success) {
        console.error("Failed to initialize Firebase");
    }
});

// Check database connection status
function checkDatabaseConnection() {
    return new Promise((resolve, reject) => {
        if (!database) {
            reject(new Error("Database not initialized, please refresh the page"));
            return;
        }

        if (!auth.currentUser) {
            reject(new Error("Not logged in, please refresh the page"));
            return;
        }

        const connectedRef = database.ref(".info/connected");
        const timeoutId = setTimeout(() => {
            connectedRef.off("value");
            reject(new Error("Connection timeout, please check your network"));
        }, 5000);

        connectedRef.on("value", (snap) => {
            clearTimeout(timeoutId);
            connectedRef.off("value");
            
            if (snap.val() === true) {
                resolve(true);
            } else {
                reject(new Error("Cannot connect to database, please check your network"));
            }
        });
    });
}

// Check if database access has expired
function checkDatabaseAccess() {
    const expirationDate = 1744786800000; // 2025-4-16
    return Date.now() < expirationDate;
}

// Get statistics data
async function getStatistics() {
    try {
        // Check database connection
        await checkDatabaseConnection();

        if (!checkDatabaseAccess()) {
            throw new Error("Database access has expired");
        }

        const snapshot = await database.ref('statistics').get();
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            // If no data exists, return initial data
            const initialData = {
                normal: 0,
                dry: 0,
                oily: 0,
                combination: 0,
                sensitive: 0,
                totalTests: 0,
                lastUpdated: Date.now()
            };
            // Save initial data to database
            await database.ref('statistics').set(initialData);
            return initialData;
        }
    } catch (error) {
        console.error("Error getting statistics:", error);
        return {
            error: error.message
        };
    }
}

// Update statistics data
async function updateStatistics(skinType) {
    try {
        // Check database connection
        await checkDatabaseConnection();

        if (!checkDatabaseAccess()) {
            throw new Error("Database access has expired");
        }

        // Get reference to current statistics
        const statsRef = database.ref('statistics');
        
        // Use transaction to ensure data consistency
        return await statsRef.transaction((currentStats) => {
            if (currentStats === null) {
                // If no data exists, create initial data
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

            // Update existing data
            currentStats[skinType] = (currentStats[skinType] || 0) + 1;
            currentStats.totalTests = (currentStats.totalTests || 0) + 1;
            currentStats.lastUpdated = Date.now();
            return currentStats;
        });
    } catch (error) {
        console.error("Error updating statistics:", error);
        return {
            error: error.message
        };
    }
}

// Format date display
function formatDate(timestamp) {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
} 
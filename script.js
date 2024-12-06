document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");

    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty!");
            return false;
        }
        const regex = /^[a-zA-Z0-9_]{4,15}$/;
        if (!regex.test(username)) {
            alert("Invalid Username!");
            return false;
        }
        return true;
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch user details");
            }
            const parsedData = await response.json();
            console.log("Response Data:", parsedData);
            displayUserData(parsedData);
        } catch (error) {
            alert("Error: Unable to fetch user details.");
            console.error("Fetch error:", error);
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved / total) * 100 || 0;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayTotalSubmissions(submissionCalendar) {
        let totalSubmissions = 0;
        for (const count of Object.values(submissionCalendar)) {
            totalSubmissions += count;
        }

        const totalSubmissionsCard = document.getElementById("total-submissions-card");
        totalSubmissionsCard.textContent = `Total Submissions: ${totalSubmissions}`;
    }

    function displayUserData(parsedData) {
        const totalEasyQues = parsedData.totalEasy || 0;
        const totalMediumQues = parsedData.totalMedium || 0;
        const totalHardQues = parsedData.totalHard || 0;

        const solvedTotalEasyQues = parsedData.easySolved || 0;
        const solvedTotalMediumQues = parsedData.mediumSolved || 0;
        const solvedTotalHardQues = parsedData.hardSolved || 0;

        updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);

        const submissionCalendar = parsedData.submissionCalendar || {};
        displayTotalSubmissions(submissionCalendar);
    }

    searchButton.addEventListener("click", function () {
        const username = usernameInput.value;
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});



// {
//     "status":"success",
//     "message":"retrieved",
//     "totalSolved":344,
//     "totalQuestions":3374,
//     "easySolved":62,
//     "totalEasy":840,
//     "mediumSolved":236,
//     "totalMedium":1762,
//     "hardSolved":46,
//     "totalHard":772,
//     "acceptanceRate":64.2,
//     "ranking":245601,
//     "contributionPoints":600,
//     "reputation":0,
//     "submissionCalendar":{
//        "1702080000":4,
//        "1702166400":6,
//        "1702857600":6,
//        "1703030400":2,
//        "1703376000":3,
//        "1703721600":1,
//        "1703808000":2,
//        "1703894400":10,
//        "1704585600":4,
//        "1705795200":3,
//        "1706918400":11,
//        "1707609600":2,
//        "1708646400":3,
//        "1708819200":7,
//        "1709424000":1,
//        "1709596800":1,
//        "1710028800":1,
//        "1715212800":2,
//        "1716595200":10,
//        "1716681600":5,
//        "1717200000":9,
//        "1717286400":7,
//        "1717804800":6,
//        "1719100800":1,
//        "1720828800":12,
//        "1721433600":9,
//        "1721520000":1,
//        "1722038400":6,
//        "1722729600":8,
//        "1723334400":3,
//        "1723852800":2,
//        "1724371200":7,
//        "1724457600":7,
//        "1724544000":1,
//        "1725667200":3,
//        "1726358400":11,
//        "1726444800":1,
//        "1726963200":6,
//        "1727568000":1,
//        "1727654400":22,
//        "1727740800":7,
//        "1727827200":8,
//        "1729382400":7,
//        "1729987200":2
//     }
//  }
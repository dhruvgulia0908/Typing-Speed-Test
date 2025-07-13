const typing_ground = document.querySelector('#textarea');
const btn = document.querySelector('#btn');
const score = document.querySelector('#score');
const show_sentence = document.querySelector('#showSentence');

let startTime, endTime, totalTimeTaken;

const fetchRandomSentence = () => {
    const nouns = ["cat", "dog", "elephant", "banana", "car", "teacher", "river", "mountain", "robot", "sun"];
    const verbs = ["runs", "jumps", "flies", "drinks", "sings", "eats", "reads", "writes", "types", "sleeps"];
    const adjectives = ["quick", "lazy", "happy", "sad", "bright", "cold", "fast", "strong", "quiet", "brave"];
    const adverbs = ["quickly", "silently", "well", "badly", "eagerly", "slowly", "gracefully", "loudly", "happily"];

    // Generate a sentence with 6-10 words
    const wordCount = Math.floor(Math.random() * 5) + 6;
    let sentence = [];

    for (let i = 0; i < wordCount; i++) {
        const wordType = Math.floor(Math.random() * 4);
        if (wordType === 0) sentence.push(nouns[Math.floor(Math.random() * nouns.length)]);
        else if (wordType === 1) sentence.push(verbs[Math.floor(Math.random() * verbs.length)]);
        else if (wordType === 2) sentence.push(adjectives[Math.floor(Math.random() * adjectives.length)]);
        else sentence.push(adverbs[Math.floor(Math.random() * adverbs.length)]);
    }

    // Capitalize first letter and end with a period
    let result = sentence.join(" ");
    result = result.charAt(0).toUpperCase() + result.slice(1) + ".";
    return result;
};

const calculateTypingSpeed = (time_taken) => {
    let totalWords = typing_ground.value.trim();
    let actualWords = totalWords === '' ? 0 : totalWords.split(/\s+/).length;

    if (actualWords !== 0) {
        let typing_speed = (actualWords / time_taken) * 60;
        typing_speed = Math.round(typing_speed);
        score.innerHTML = `Your typing speed is <b>${typing_speed}</b> words per minute. <br>
        You wrote <b>${actualWords}</b> words in <b>${time_taken}</b> seconds.`;
    } else {
        score.innerHTML = `You typed 0 words. Time taken: ${time_taken} seconds.`;
    }
};

const endTypingTest = () => {
    btn.innerText = "Start";

    let date = new Date();
    endTime = date.getTime();

    totalTimeTaken = (endTime - startTime) / 1000;
    calculateTypingSpeed(totalTimeTaken);

    show_sentence.innerHTML = "";
    typing_ground.value = "";
};

const startTyping = async () => {
    typing_ground.setAttribute('disabled', 'true');
    const sentence = await fetchRandomSentence();
    show_sentence.innerHTML = sentence;

    typing_ground.removeAttribute('disabled');
    typing_ground.value = "";
    typing_ground.focus();

    let date = new Date();
    startTime = date.getTime();

    btn.innerText = "Done";
};

btn.addEventListener('click', () => {
    switch (btn.innerText.toLowerCase()) {
        case "start":
            startTyping();
            break;

        case "done":
            typing_ground.setAttribute('disabled', 'true');
            endTypingTest();
            break;
    }
});

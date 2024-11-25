import axios from 'axios';

const API_KEY = 'sk-346454e8570d46259a3b4641ec7226cf';
const API_URL = 'https://api.deepseek.com/chat/completions';

export const generateStoryFromWords = async (words: string) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `我看到一个好玩的记英语单词方法：一段离奇新颖的中文故事中穿插着英语，随后再给出单词释义。 
格式：文章夹杂着英语单词，没有中文意思。单词释义额外列出来。这是我给你的几个单词。`
          },
          {
            role: 'user',
            content: `请使用这些英语单词创作一个故事：${words}

要求：
1. 故事主体用中文写作，但要自然地融入这些英语单词
2. 英语单词在故事中保持英文形式，不要在后面加括号翻译
3. 故事要有意想不到的转折，令人回味无穷
4. 可以加入爱情元素，制造浪漫或感人的场景
5. 适当使用幽默元素，让故事更加生动
6. 故事结束后，另起一行写"单词释义："
7. 然后列出每个英语单词的中文意思`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating story:', error);
    throw new Error('生成故事失败，请重试。');
  }
};

export const getWordPronunciation = (word: string) => {
  return `http://dict.youdao.com/dictvoice?type=0&audio=${encodeURIComponent(word)}`;
};
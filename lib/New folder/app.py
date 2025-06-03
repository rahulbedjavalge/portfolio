from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message')

        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        # Simulate AI response (replace with actual model integration)
        ai_response = f"AI Response to: {user_message}"

        return jsonify({'reply': ai_response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

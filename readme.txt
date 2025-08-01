# Chess.com confirm move button PC  


Locks the Chess.com board until you confirm each move, with a lock‐release toggle to help you practice precision and avoid blunders.

This extension works purely by layering an overlay above the board; it does not intercept or alter any network calls.
As far as I am aware, using this add-on does not violate any Fair Play Policy.

The buttons appear next to the username.

How to use 

1. **Start your game**
  ♟️Load any Chess.com game and your [Release Move/Board Released] and [Free/locked] buttons will appear next to your username under the board.

2. **Board is locked by default**
  ♟️You’ll see the 🚫 cursor over the board, preventing any accidental moves.

3. **[Release Move] for one move (and legal-move hints)**
  ♟️Click [Release Move] → the board unlocks for a single move.
  While unlocked, you can click a board piece to see Chess.com’s built-in legal-move dots and drag to move.

4. Auto-relock after your move
  ♟️ As soon as you drop the piece, the overlay re-engages and the board locks again.

5. **Free/Locked toggle**
  ♟️ Click **Free/Locked** to permanently unlock and click again to re-lock. You might need this during tense last second games.


How to install

❗Please note that the full add-on is not released yet and that you will need to reinstall this add-on every time you start a new browser session. Closing the browser will uninstall the add-on.

Firefox 
1. **Download the code**
   1.1. Visit your GitHub repository and click **Code → Download ZIP**
   1.2. Unzip the archive to a folder on your computer

2. **Load into Firefox**
   2.1. Open `about:debugging#/runtime/this-firefox` in Firefox
   2.2. Click **“Load Temporary Add-on…”** and select the folder’s `manifest.json`

3. **Verify installation**
   3.1. Confirm the **“Confirm Move”** extension appears in the add-ons list
   3.2. Navigate to any Chess.com game—your **Release Move** and **Emergency** buttons should be visible

4. **Keep up to date**
   4.1. When you pull new commits from GitHub, hit **Reload** next to the add-on on the `about:debugging` page

5. **Uninstall**
   5.1. On `about:debugging`, click **Remove** under the **Confirm Move** entry to disable and delete it

Chrome

1. **Download the code**
   1.1. Click **Code → Download ZIP**
   1.2. Unzip the downloaded archive to a folder on your computer

2. **Load into Chrome**
   2.1. Navigate to `chrome://extensions/` in your browser
   2.2. Enable **Developer mode** (toggle at top right)
   2.3. Click **“Load unpacked”**, then select the folder containing your `manifest.json`

3. **Verify installation**
   3.1. Ensure **“Confirm Move”** appears in your list of extensions
   3.2. Visit any Chess.com game page—the **Release Move** and **Emergency Release** buttons should be visible

4. **Keep up to date**
   4.1. After pulling new commits from GitHub, return to `chrome://extensions/` and click the **Reload** icon on your extension tile

5. **Uninstall**
   5.1. On `chrome://extensions/`, click **Remove** under the **Confirm Move** extension to disable and delete it

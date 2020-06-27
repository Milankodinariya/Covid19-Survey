# PSI Support Console
A queuing support system for Zoho Assist, so you can manage multiple session add details for each one.

# Limitations
 - If you close a session it will not close on their side. If you close and they have it open you will not be able to add the sesssion again. They would have to reconnect.
 - If a user closes the session it will not be marked as closed on the UI side.
 - Putting a session on hold does not put it on hold on the customers side.
 - When a user downloads the program from www.psisupport.com and never runs it, it will be marked as waiting in our system.
 - When chatting it will have 1 name

# Zoho Limitations
1) The ability to customize the sound of the chat when one comes in
2) the ability to get a webhook when a session closes
3) ability to close a session through the API
4) a webhook when someone actually is all the way connected
and has pressed the "Join" button to john the session
5) if you close down and open up the tab of the session you were chatting on, you loose your chat history in your window
6) html5 file transfer is not very good (i know I can switch to the old one)

# Responses 20200618
For 1) Can I confirm that you are referring to the chat during the remote session. We do not have any audio for a chat during the remote session hence we may not be able to customise this at the moment
For 2), 3) and 4) I might not be able to provide you with an answer at this moment as I am not exactly sure about it. But can I check with my team and write back to you to jeffd@psibuffalo.com
For 5) We are working on a new implementation for the chat during the remote session. When this is released you should not be losing any chat history
For 6) We have a Stand alone File Transfer feature in our pipeline and we will be working on this feature soon. I can note down your email address and notify you when this gets released

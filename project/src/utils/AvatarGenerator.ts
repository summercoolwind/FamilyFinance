export default class AvatarGenerator {
    
    public static generateAvatar(text:string,
        fontColor = 'white',
        backgroundColor = 'black') {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = 200;
        canvas.height = 200;

        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, canvas.width / 2, canvas.height / 2);
        
        console.log(canvas.toDataURL('image/png'));
        return canvas.toDataURL("image/png");
    }
}
export class Languages {
	
	public static languages: any[] = [
		/*{
		    "id": 29,
		    "name": "JavaScript",
		    "resume": "javascript",
		    "code_init": `function x() {
	console.log("Hello world!");
}
x();`
		},*/
		  {
		    "id": 26,
		    "name": "Java (OpenJDK 9)",
		    "resume": "java",
		    "code_init": `import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner tec = new Scanner(System.in);
        String name = tec.next();
        System.out.println("Hello " + name);
    }
}
`
		  },
		  {
		    "id": 10,
		    "name": "C++ (g++ 7.2.0)",
		    "resume": "cpp"
		  },
		  {
		    "id": 34,
		    "name": "Python (3.6.0)",
		    "resume": "python"
		  }
	]
}
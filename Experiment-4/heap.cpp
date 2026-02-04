#include<bits/stdc++.h>
using namespace std;
#define MAX 100
int heap[MAX];
int heapsize=0;
void heapifydown(int i)
{
    int smallest=i;
    int left=2*i+1;
    int right=2*i+2;
    if(left<heapsize&&heap[smallest]>heap[left])
    {
        smallest=left;
    }
    if(right<heapsize&&heap[smallest]>heap[right])
    {
        smallest=right;
    }
    if(smallest!=i)
    {
    swap(heap[i],heap[smallest]);
    heapifydown(smallest);
    }
}
void heapify(int i)
{
    while(i>0&&heap[(i-1)/2]>heap[i])
    {
        swap(heap[(i-1)/2],heap[i]);
        i=(i-1)/2;
    }
}
void insert(int val)
{
    if(heapsize==MAX)
    {
        cout<<"overflow";
        return;
    }
    heap[heapsize]=val;
    heapsize++;
    heapify(heapsize-1);
}
void deletenode()
{
    if(heapsize==0)
    {
        cout<<"no elemnt";
        return;
    }
    heap[0]=heap[heapsize-1];
    heapsize--;
    heapifydown(0);
}
int search(int val)
{
    for(int i = 0; i < heapsize; i++)
    {
        if(heap[i] == val)
        {
            return i;   
        }
    }
    return -1;  
}

int main()
{
    int x;
    insert(2);
    insert(1);
    insert(3);
    deletenode();
    deletenode();
    for(int i=0;i<heapsize;i++)
    {
        cout<<heap[i];
    }
    cout<<"Enter the element you want to search"<<endl;
    cin>>x;
    int index = search(x);

    if(index != -1)
        cout << "Element found at index " << index;
    else
        cout << "Element not found";
}